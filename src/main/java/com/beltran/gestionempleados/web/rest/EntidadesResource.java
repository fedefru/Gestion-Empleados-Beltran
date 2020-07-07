package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Entidades;
import com.beltran.gestionempleados.repository.EntidadesRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Entidades}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EntidadesResource {

    private final Logger log = LoggerFactory.getLogger(EntidadesResource.class);

    private static final String ENTITY_NAME = "entidades";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntidadesRepository entidadesRepository;

    public EntidadesResource(EntidadesRepository entidadesRepository) {
        this.entidadesRepository = entidadesRepository;
    }

    /**
     * {@code POST  /entidades} : Create a new entidades.
     *
     * @param entidades the entidades to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new entidades, or with status {@code 400 (Bad Request)} if the entidades has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entidades")
    public ResponseEntity<Entidades> createEntidades(@RequestBody Entidades entidades) throws URISyntaxException {
        log.debug("REST request to save Entidades : {}", entidades);
        if (entidades.getId() != null) {
            throw new BadRequestAlertException("A new entidades cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Entidades result = entidadesRepository.save(entidades);
        return ResponseEntity.created(new URI("/api/entidades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entidades} : Updates an existing entidades.
     *
     * @param entidades the entidades to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entidades,
     * or with status {@code 400 (Bad Request)} if the entidades is not valid,
     * or with status {@code 500 (Internal Server Error)} if the entidades couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entidades")
    public ResponseEntity<Entidades> updateEntidades(@RequestBody Entidades entidades) throws URISyntaxException {
        log.debug("REST request to update Entidades : {}", entidades);
        if (entidades.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Entidades result = entidadesRepository.save(entidades);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entidades.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /entidades} : get all the entidades.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entidades in body.
     */
    @GetMapping("/entidades")
    public List<Entidades> getAllEntidades() {
        log.debug("REST request to get all Entidades");
        return entidadesRepository.findAll();
    }

    /**
     * {@code GET  /entidades/:id} : get the "id" entidades.
     *
     * @param id the id of the entidades to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entidades, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entidades/{id}")
    public ResponseEntity<Entidades> getEntidades(@PathVariable Long id) {
        log.debug("REST request to get Entidades : {}", id);
        Optional<Entidades> entidades = entidadesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(entidades);
    }

    /**
     * {@code DELETE  /entidades/:id} : delete the "id" entidades.
     *
     * @param id the id of the entidades to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entidades/{id}")
    public ResponseEntity<Void> deleteEntidades(@PathVariable Long id) {
        log.debug("REST request to delete Entidades : {}", id);
        entidadesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
