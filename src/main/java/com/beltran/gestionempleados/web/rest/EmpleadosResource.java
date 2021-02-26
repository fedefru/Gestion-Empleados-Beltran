package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.*;
import com.beltran.gestionempleados.domain.DTO.EmpleadoRegistroDTO;
import com.beltran.gestionempleados.repository.*;
import com.beltran.gestionempleados.service.UserService;
import com.beltran.gestionempleados.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.Random;

/**
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Empleados}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EmpleadosResource {

    @Autowired
    UserService userService;

    private final Logger log = LoggerFactory.getLogger(EmpleadosResource.class);

    private final PasswordEncoder passwordEncoder;


    private static final String ENTITY_NAME = "empleados";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmpleadosRepository empleadosRepository;
    private final UsuariosRepository usuariosRepository;
    private final DireccionesRepository direccionesRepository;
    private final TipoDireccionRepository tipoDireccionRepository;
    private final PaisesRepository paisesRepository;
    private final ProvinciasRepository provinciasRepository;
    private final CiudadesRepository ciudadesRepository;
    private final TipoContactosRepository tipoContactosRepository;
    private final UserRepository userRepository;


    public EmpleadosResource(EmpleadosRepository empleadosRepository,
                             UserRepository userRepository,
                             UsuariosRepository usuariosRepository,
                             DireccionesRepository direccionesRepository,
                             TipoDireccionRepository tipoDireccionRepository,
                             PasswordEncoder passwordEncoder, PaisesRepository paisesRepository, ProvinciasRepository provinciasRepository, CiudadesRepository ciudadesRepository, TipoContactosRepository tipoContactosRepository) {
        this.empleadosRepository = empleadosRepository;
        this.userRepository = userRepository;
        this.usuariosRepository = usuariosRepository;
        this.direccionesRepository = direccionesRepository;
        this.tipoDireccionRepository = tipoDireccionRepository;
        this.passwordEncoder = passwordEncoder;
        this.paisesRepository = paisesRepository;
        this.provinciasRepository = provinciasRepository;
        this.ciudadesRepository = ciudadesRepository;
        this.tipoContactosRepository = tipoContactosRepository;
    }

    /**
     * {@code POST  /empleados} : Create a new empleados.
     *
     * @param empleados the empleados to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new empleados, or with status {@code 400 (Bad Request)} if the empleados has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/empleados")
    public ResponseEntity<Empleados> createEmpleados(@RequestBody Empleados empleados) throws URISyntaxException {
        log.debug("REST request to save Empleados : {}", empleados);
        if (empleados.getId() != null) {
            throw new BadRequestAlertException("A new empleados cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Empleados result = empleadosRepository.save(empleados);
        return ResponseEntity.created(new URI("/api/empleados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/empleados/user")
    public ResponseEntity<Empleados> createEmpleadosUsuario(@RequestBody Empleados empleados) throws URISyntaxException {
        log.debug("REST request to save Empleados : {}", empleados);
        if (empleados.getId() != null) {
            throw new BadRequestAlertException("A new empleados cannot already have an ID", ENTITY_NAME, "idexists");
        }
        String encryptedPassword = passwordEncoder.encode(empleados.getUsuario().getClave());
        //empleados.getUsuario().setClave(encryptedPassword);
        Optional<Usuarios> u = usuariosRepository.findByUsuario(empleados.getUsuario().getUsuario());
        if(u.isPresent()) {
            Random r = new Random();
            int valorDado = r.nextInt(999)+1;  // Entre 0 y 999, más 1.
            empleados.getUsuario().setUsuario(empleados.getUsuario().getUsuario()+valorDado);
        }
        Usuarios resultUser = usuariosRepository.save(empleados.getUsuario());
        empleados.getUsuario().setId(resultUser.getId());
        Empleados result = empleadosRepository.save(empleados);

        userService.registerUser(empleados.getUsuario(),empleados.getUsuario().getClave());
        return ResponseEntity.created(new URI("/api/empleados/user" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }


    @PostMapping("/empleados/registro-empleado")
    public ResponseEntity<Empleados> registroEmpleadoDto(@RequestBody EmpleadoRegistroDTO empleadoRegistroDTO) throws URISyntaxException {
        log.debug("REST request to save Empleados : {}", empleadoRegistroDTO);
        if (empleadoRegistroDTO.getEmpleados().getId() != null) {
            throw new BadRequestAlertException("A new empleados cannot already have an ID", ENTITY_NAME, "idexists");
        }

        try {

            // Guardo los datos que me llegan con el DTO para luego relacionarlos con el empleado
            TipoContactos resultTipoContacto = tipoContactosRepository.save(empleadoRegistroDTO.getEmpleados().getUsuario().getContacto());

            // Le guardo el id del pais a la provincia
            Paises resultPais = paisesRepository.save(empleadoRegistroDTO.getPaises());
            empleadoRegistroDTO.getProvincias().getPais().setId(resultPais.getId());

            // Le guardo el id de la provincia a la ciudad
            Provincias resultProvincia = provinciasRepository.save(empleadoRegistroDTO.getProvincias());
            empleadoRegistroDTO.getDirecciones().getCiudad().getProvicia().setId(resultProvincia.getId());

            // Le guardo el id de la ciudad a la direccion
            Ciudades resultCiudades = ciudadesRepository.save(empleadoRegistroDTO.getDirecciones().getCiudad());
            empleadoRegistroDTO.getDirecciones().getCiudad().setId(resultCiudades.getId());

            Direcciones resultDirecciones = direccionesRepository.save(empleadoRegistroDTO.getDirecciones());


            // Instancio un nuevo tipo de direccion en el cual le seteo el ID de la direccion que acabo de crear
            TipoDireccion tipoDireccion = new TipoDireccion();
            tipoDireccion.setDireccion(resultDirecciones);
            tipoDireccion.setDescripcion("Direccion del empleado con id "+ empleadoRegistroDTO.getEmpleados().getId());
            // Hago el save del tipo de direccion
            TipoDireccion resultTipoDireccion = tipoDireccionRepository.save(tipoDireccion);


            String encryptedPassword = passwordEncoder.encode(empleadoRegistroDTO.getEmpleados().getUsuario().getClave());
            //empleados.getUsuario().setClave(encryptedPassword);

            Optional<Usuarios> u = usuariosRepository.findByUsuario(empleadoRegistroDTO.getEmpleados().getUsuario().getUsuario());
            if(u.isPresent()) {
                Random r = new Random();
                int valorDado = r.nextInt(999)+1;  // Entre 0 y 999, más 1.
                empleadoRegistroDTO.getEmpleados().getUsuario().setUsuario(empleadoRegistroDTO.getEmpleados().getUsuario().getUsuario()+valorDado);
            }
            Usuarios resultUser = usuariosRepository.save(empleadoRegistroDTO.getEmpleados().getUsuario());
            empleadoRegistroDTO.getEmpleados().getUsuario().setId(resultUser.getId());

            empleadoRegistroDTO.getEmpleados().getUsuario().setDireccion(resultTipoDireccion);
            empleadoRegistroDTO.getEmpleados().getUsuario().setContacto(resultTipoContacto);

            Empleados result = empleadosRepository.save(empleadoRegistroDTO.getEmpleados());

            userService.registerUser(empleadoRegistroDTO.getEmpleados().getUsuario(),empleadoRegistroDTO.getEmpleados().getUsuario().getClave());
            return ResponseEntity.created(new URI("/api/empleados/registro-empleado" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);


        } catch (Exception e){
            System.out.println(e);
            return null;
        }

    }

    @PutMapping("/empleados/update-empleado")
    public ResponseEntity<Empleados> updateEmpleadoDto(@RequestBody EmpleadoRegistroDTO empleadoRegistroDTO) throws URISyntaxException {
        log.debug("REST request to update Empleados : {}", empleadoRegistroDTO);
        System.out.println("***************Empleados que me llega " + empleadoRegistroDTO.toString() + " **********");
        if (empleadoRegistroDTO.getEmpleados().getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        try {


            Direcciones resultDirecciones = direccionesRepository.save(empleadoRegistroDTO.getDirecciones());



            // Hago el save del tipo de direccion

            TipoDireccion tipoDireccionPrueba = new TipoDireccion();
            tipoDireccionPrueba.setDireccion(resultDirecciones);
            tipoDireccionPrueba.setDescripcion("Direccion del empleado con id "+ resultDirecciones.getId());

            TipoDireccion resultTipoDireccion = tipoDireccionRepository.save(tipoDireccionPrueba);



            // setear al usuario

            empleadoRegistroDTO.getEmpleados().getUsuario().setDireccion(resultTipoDireccion);




            // Codifico la pass
            String encryptedPassword = passwordEncoder.encode(empleadoRegistroDTO.getEmpleados().getUsuario().getClave());
            //empleados.getUsuario().setClave(encryptedPassword);
            empleadoRegistroDTO.getEmpleados().getUsuario().setClave(encryptedPassword);

            //Me traigo el user de walter

            User resultUser = userRepository.findOneByLoginMio(empleadoRegistroDTO.getEmpleados().getUsuario().getUsuario());


            // Le seteo el usuario
            resultUser.setLogin(empleadoRegistroDTO.getEmpleados().getUsuario().getUsuario());
            // Le seteo el Nombre
            resultUser.setFirstName(empleadoRegistroDTO.getEmpleados().getUsuario().getNombre());
            // Le seteo el apellido
            resultUser.setLastName(empleadoRegistroDTO.getEmpleados().getUsuario().getApellido());
            // Le seteo la clave
            resultUser.setPassword(encryptedPassword);

            userRepository.save(resultUser);


            Usuarios resultUserElAri = usuariosRepository.save(empleadoRegistroDTO.getEmpleados().getUsuario());

            // seteo el estado
            resultUserElAri.setEstado(empleadoRegistroDTO.getEmpleados().getEstado());

            empleadoRegistroDTO.getEmpleados().setUsuario(resultUserElAri);

            Empleados result = empleadosRepository.save(empleadoRegistroDTO.getEmpleados());


            //userService.registerUser(empleadoRegistroDTO.getEmpleados().getUsuario(),empleadoRegistroDTO.getEmpleados().getUsuario().getClave());

            return ResponseEntity.created(new URI("/api/empleados/registro-empleado" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);


        } catch (Exception e){
            System.out.println(e);
            return null;
        }

    }


    /**
     * {@code PUT  /empleados} : Updates an existing empleados.
     *
     * @param empleados the empleados to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated empleados,
     * or with status {@code 400 (Bad Request)} if the empleados is not valid,
     * or with status {@code 500 (Internal Server Error)} if the empleados couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */


        /**
     * {@code GET  /empleados} : get all the empleados.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of empleados in body.
     */
    @GetMapping("/empleados")
    public ResponseEntity<List<Empleados>> getAllEmpleados(Pageable pageable) {
        log.debug("REST request to get a page of Empleados");
        Page<Empleados> page = empleadosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /empleados/:id} : get the "id" empleados.
     *
     * @param id the id of the empleados to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the empleados, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/empleados/{id}")
    public ResponseEntity<Empleados> getEmpleados(@PathVariable Long id) {
        log.debug("REST request to get Empleados : {}", id);
        Optional<Empleados> empleados = empleadosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(empleados);
    }

    /**
     * {@code DELETE  /empleados/:id} : delete the "id" empleados.
     *
     * @param id the id of the empleados to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Void> deleteEmpleados(@PathVariable Long id) {
        log.debug("REST request to delete Empleados : {}", id);
        empleadosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
