package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Permisos;
import com.beltran.gestionempleados.repository.PermisosRepository;
import com.beltran.gestionempleados.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Permisos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PermisosResource {

    private final Logger log = LoggerFactory.getLogger(PermisosResource.class);

    private static final String ENTITY_NAME = "permisos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PermisosRepository permisosRepository;

    public PermisosResource(PermisosRepository permisosRepository) {
        this.permisosRepository = permisosRepository;
    }

    /**
     * {@code POST  /permisos} : Create a new permisos.
     *
     * @param permisos the permisos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new permisos, or with status {@code 400 (Bad Request)} if the permisos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/permisos")
    public ResponseEntity<Permisos> createPermisos(@RequestBody Permisos permisos) throws URISyntaxException {
        log.debug("REST request to save Permisos : {}", permisos);
        if (permisos.getId() != null) {
            throw new BadRequestAlertException("A new permisos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Permisos result = permisosRepository.save(permisos);
        return ResponseEntity.created(new URI("/api/permisos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /permisos} : Updates an existing permisos.
     *
     * @param permisos the permisos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated permisos,
     * or with status {@code 400 (Bad Request)} if the permisos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the permisos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/permisos")
    public ResponseEntity<Permisos> updatePermisos(@RequestBody Permisos permisos) throws URISyntaxException {
        log.debug("REST request to update Permisos : {}", permisos);
        if (permisos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Permisos result = permisosRepository.save(permisos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, permisos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /permisos} : get all the permisos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of permisos in body.
     */
    @GetMapping("/permisos")
    public List<Permisos> getAllPermisos() {
        log.debug("REST request to get all Permisos");
        return permisosRepository.findAll();
    }

    /**
     * {@code GET  /permisos/:id} : get the "id" permisos.
     *
     * @param id the id of the permisos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the permisos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/permisos/{id}")
    public ResponseEntity<Permisos> getPermisos(@PathVariable Long id) {
        log.debug("REST request to get Permisos : {}", id);
        Optional<Permisos> permisos = permisosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(permisos);
    }

    /**
     * {@code DELETE  /permisos/:id} : delete the "id" permisos.
     *
     * @param id the id of the permisos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/permisos/{id}")
    public ResponseEntity<Void> deletePermisos(@PathVariable Long id) {
        log.debug("REST request to delete Permisos : {}", id);
        permisosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
