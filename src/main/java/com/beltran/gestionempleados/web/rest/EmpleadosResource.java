package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.*;
import com.beltran.gestionempleados.domain.DTO.EmpleadoDTO;
import com.beltran.gestionempleados.domain.DTO.EmpresaDTO;
import com.beltran.gestionempleados.repository.EmpleadosRepository;
import com.beltran.gestionempleados.repository.UsuariosRepository;
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
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

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

    public EmpleadosResource(EmpleadosRepository empleadosRepository,
                             UsuariosRepository usuariosRepository,
                             PasswordEncoder passwordEncoder) {
        this.empleadosRepository = empleadosRepository;
        this.usuariosRepository = usuariosRepository;
        this.passwordEncoder = passwordEncoder;
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
        //Usuarios resultUser = usuariosRepository.save(empleados.getUsuario());
        //empleados.getUsuario().setId(resultUser.getId());
        Empleados result = empleadosRepository.save(empleados);

        userService.registerUser(empleados.getUsuario(),empleados.getUsuario().getClave());
        return ResponseEntity.created(new URI("/api/empleados/user" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
/*
    @PostMapping("/empleados/user")
    public ResponseEntity<Empleados> createEmpleadoUser(@RequestBody EmpleadoDTO empleadoDTO) throws URISyntaxException {
        log.debug("REST request to save Empresas with registro-empresa : {}", empleadoDTO);

        // Debo importar todos los repositories de las entidades para realizar el save exitoso de cada uno...

        try{
            // Guardo los datos que me llegan con el DTO para luego relacionarlos con el empleado
            Usuarios usuario = usuariosRepository.save(empleadoDTO.getUsuarios());
            empleadoDTO.getEmpleado().getUsuario().setId(usuario.getId());
            // Le guardo el id del usuario al empleado
            Empleados empleado = empleadosRepository.save(empleadoDTO.getEmpleado());

            return ResponseEntity.created(new URI("/api/empleados/user" + empleado.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, empleado.getId().toString()))
                .body(empleado);
        }catch (Exception e){
            System.out.println(e);
        }
        return null;
    }
*/

    /**
     * {@code PUT  /empleados} : Updates an existing empleados.
     *
     * @param empleados the empleados to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated empleados,
     * or with status {@code 400 (Bad Request)} if the empleados is not valid,
     * or with status {@code 500 (Internal Server Error)} if the empleados couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/empleados")
    public ResponseEntity<Empleados> updateEmpleados(@RequestBody Empleados empleados) throws URISyntaxException {
        log.debug("REST request to update Empleados : {}", empleados);
        if (empleados.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Empleados result = empleadosRepository.save(empleados);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, empleados.getId().toString()))
            .body(result);
    }

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
