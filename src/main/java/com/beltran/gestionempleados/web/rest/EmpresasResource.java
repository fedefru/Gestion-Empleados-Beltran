package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.*;
import com.beltran.gestionempleados.domain.DTO.EmpresaDTO;
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
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Empresas}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EmpresasResource {

    @Autowired
    UserService userService;

    private final Logger log = LoggerFactory.getLogger(EmpresasResource.class);

    private static final String ENTITY_NAME = "empresas";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmpresasRepository empresasRepository;
    private final TipoContactosRepository tipoContactosRepository;
    private final PaisesRepository paisesRepository;
    private final ProvinciasRepository provinciasRepository;
    private final CiudadesRepository ciudadesRepository;
    private final DireccionesRepository direccionesRepository;
    private final TipoDireccionRepository tipoDireccionRepository;

    public EmpresasResource(EmpresasRepository empresasRepository,
                            TipoContactosRepository tipoContactosRepository,
                            PaisesRepository paisesRepository,
                            ProvinciasRepository provinciasRepository,
                            CiudadesRepository ciudadesRepository,
                            DireccionesRepository direccionesRepository,
                            TipoDireccionRepository tipoDireccionRepository){
            this.empresasRepository = empresasRepository;
            this.tipoContactosRepository = tipoContactosRepository;
            this.paisesRepository = paisesRepository;
            this.provinciasRepository = provinciasRepository;
            this.ciudadesRepository = ciudadesRepository;
            this.direccionesRepository = direccionesRepository;
            this.tipoDireccionRepository = tipoDireccionRepository;
    }

    /**
     * {@code POST  /empresas} : Create a new empresas.
     *
     * @param empresas the empresas to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new empresas, or with status {@code 400 (Bad Request)} if the empresas has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/empresas")
    public ResponseEntity<Empresas> createEmpresas(@RequestBody Empresas empresas) throws URISyntaxException {
        log.debug("REST request to save Empresas : {}", empresas);
        if (empresas.getId() != null) {
            throw new BadRequestAlertException("A new empresas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Empresas result = empresasRepository.save(empresas);
        userService.registerEmpresa(empresas);
        return ResponseEntity.created(new URI("/api/empresas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }


    @PostMapping("/empresas/registro")
    public ResponseEntity<Empresas> createEmpresasRegistro(@RequestBody EmpresaDTO empresaDTO) throws URISyntaxException {
        log.debug("REST request to save Empresas with registro-empresa : {}", empresaDTO);

        System.out.println("*************" + empresaDTO.getUsuario()+"*************"+ empresaDTO +"*************");

        // Debo importar todos los repositories de las entidades para realizar el save exitoso de cada uno. Pais, Provincia, Ciudad ...

        try{
            // Guardo los datos que me llegan con el DTO para luego relacionarlos con la empresa
            TipoContactos resultTipoContacto = tipoContactosRepository.save(empresaDTO.getTipoContactos());

            // Le guardo el id del pais a la provincia
            Paises resultPais = paisesRepository.save(empresaDTO.getPaises());
            empresaDTO.getProvincias().getPais().setId(resultPais.getId());

            // Le guardo el id de la provincia a la ciudad
            Provincias resultProvincia = provinciasRepository.save(empresaDTO.getProvincias());
            empresaDTO.getCiudades().getProvicia().setId(resultProvincia.getId());

            // Le guardo el id de la ciudad a la direccion
            Ciudades resultCiudades = ciudadesRepository.save(empresaDTO.getCiudades());
            empresaDTO.getDirecciones().getCiudad().setId(resultCiudades.getId());

            Direcciones resultDirecciones = direccionesRepository.save(empresaDTO.getDirecciones());


            // Instancio un nuevo tipo de direccion en el cual le seteo el ID de la direccion que acabo de crear
            TipoDireccion tipoDireccion = new TipoDireccion();
            tipoDireccion.setDireccion(resultDirecciones);

            // Hago el save del tipo de direccion
            TipoDireccion resultTipoDireccion = tipoDireccionRepository.save(tipoDireccion);

            Empresas empresa = new Empresas();

            empresa.setNombre(empresaDTO.getNombre());
            empresa.setUsuario(empresaDTO.getUsuario());
            empresa.setClave(empresaDTO.getClave());
            empresa.setDireccion(resultTipoDireccion);
            empresa.setContacto(empresaDTO.getTipoContactos());

            Empresas resultEmpresa = empresasRepository.save(empresa);

            userService.registerEmpresa(empresa);
            return ResponseEntity.created(new URI("/api/empresas/" + resultEmpresa.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultEmpresa.getId().toString()))
                .body(resultEmpresa);
        }catch (Exception e){
            System.out.println(e);
        }
        return null;
    }

    /**
     * {@code PUT  /empresas} : Updates an existing empresas.
     *
     * @param empresas the empresas to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated empresas,
     * or with status {@code 400 (Bad Request)} if the empresas is not valid,
     * or with status {@code 500 (Internal Server Error)} if the empresas couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/empresas")
    public ResponseEntity<Empresas> updateEmpresas(@RequestBody Empresas empresas) throws URISyntaxException {
        log.debug("REST request to update Empresas : {}", empresas);
        if (empresas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Empresas result = empresasRepository.save(empresas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, empresas.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /empresas} : get all the empresas.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of empresas in body.
     */
    @GetMapping("/empresas")
    public ResponseEntity<List<Empresas>> getAllEmpresas(Pageable pageable) {
        log.debug("REST request to get a page of Empresas");
        Page<Empresas> page = empresasRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /empresas/:id} : get the "id" empresas.
     *
     * @param id the id of the empresas to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the empresas, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/empresas/{id}")
    public ResponseEntity<Empresas> getEmpresas(@PathVariable Long id) {
        log.debug("REST request to get Empresas : {}", id);
        Optional<Empresas> empresas = empresasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(empresas);
    }

    @GetMapping("/empresas/logueada/{nombre}")
    public ResponseEntity<Empresas> getEmpresasByUsuario(@PathVariable String nombre) {
        log.debug("REST request to get Empresas by Usuario: {}", nombre);
        Optional<Empresas> empresas = empresasRepository.findByUsuario(nombre);
        return ResponseUtil.wrapOrNotFound(empresas);
    }

    /**
     * {@code DELETE  /empresas/:id} : delete the "id" empresas.
     *
     * @param id the id of the empresas to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/empresas/{id}")
    public ResponseEntity<Void> deleteEmpresas(@PathVariable Long id) {
        log.debug("REST request to delete Empresas : {}", id);
        empresasRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
