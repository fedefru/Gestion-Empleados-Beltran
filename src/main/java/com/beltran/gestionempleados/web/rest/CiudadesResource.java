package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Ciudades;
import com.beltran.gestionempleados.domain.Provincias;
import com.beltran.gestionempleados.repository.CiudadesRepository;
import com.beltran.gestionempleados.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Ciudades}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CiudadesResource {

    private final Logger log = LoggerFactory.getLogger(CiudadesResource.class);

    private static final String ENTITY_NAME = "ciudades";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CiudadesRepository ciudadesRepository;

    public CiudadesResource(CiudadesRepository ciudadesRepository) {
        this.ciudadesRepository = ciudadesRepository;
    }

    /**
     * {@code POST  /ciudades} : Create a new ciudades.
     *
     * @param ciudades the ciudades to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ciudades, or with status {@code 400 (Bad Request)} if the ciudades has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ciudades")
    public ResponseEntity<Ciudades> createCiudades(@RequestBody Ciudades ciudades) throws URISyntaxException {
        log.debug("REST request to save Ciudades : {}", ciudades);
        if (ciudades.getId() != null) {
            throw new BadRequestAlertException("A new ciudades cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ciudades result = ciudadesRepository.save(ciudades);
        return ResponseEntity.created(new URI("/api/ciudades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ciudades} : Updates an existing ciudades.
     *
     * @param ciudades the ciudades to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ciudades,
     * or with status {@code 400 (Bad Request)} if the ciudades is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ciudades couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ciudades")
    public ResponseEntity<Ciudades> updateCiudades(@RequestBody Ciudades ciudades) throws URISyntaxException {
        log.debug("REST request to update Ciudades : {}", ciudades);
        if (ciudades.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ciudades result = ciudadesRepository.save(ciudades);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ciudades.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ciudades} : get all the ciudades.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ciudades in body.
     */
    @GetMapping("/ciudades")
    public ResponseEntity<List<Ciudades>> getAllCiudades(Pageable pageable) {
        log.debug("REST request to get a page of Ciudades");
        Page<Ciudades> page = ciudadesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ciudades/:id} : get the "id" ciudades.
     *
     * @param id the id of the ciudades to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ciudades, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ciudades/{id}")
    public ResponseEntity<Ciudades> getCiudades(@PathVariable Long id) {
        log.debug("REST request to get Ciudades : {}", id);
        Optional<Ciudades> ciudades = ciudadesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ciudades);
    }

    @GetMapping("/ciudades/nombre/{nombre}")
    public ResponseEntity<Ciudades> getCiudadesByNombre(@PathVariable String nombre) {
        log.debug("REST request to get Ciudades by nombre : {}", nombre);
        Optional<Ciudades> ciudades = ciudadesRepository.findByNombre(nombre);
        return ResponseUtil.wrapOrNotFound(ciudades);
    }

    @GetMapping("/getByState/{id}")
    public List<Ciudades> getByState(@PathVariable Long id) {
        log.debug("REST request to get Ciudades : {}", id);
        return  ciudadesRepository.findAllByProviciaId(id);
    }

    /**
     * {@code DELETE  /ciudades/:id} : delete the "id" ciudades.
     *
     * @param id the id of the ciudades to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ciudades/{id}")
    public ResponseEntity<Void> deleteCiudades(@PathVariable Long id) {
        log.debug("REST request to delete Ciudades : {}", id);
        ciudadesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
