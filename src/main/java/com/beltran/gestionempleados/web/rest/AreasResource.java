package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Areas;
import com.beltran.gestionempleados.repository.AreasRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Areas}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AreasResource {

    private final Logger log = LoggerFactory.getLogger(AreasResource.class);

    private static final String ENTITY_NAME = "areas";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AreasRepository areasRepository;

    public AreasResource(AreasRepository areasRepository) {
        this.areasRepository = areasRepository;
    }

    /**
     * {@code POST  /areas} : Create a new areas.
     *
     * @param areas the areas to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new areas, or with status {@code 400 (Bad Request)} if the areas has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/areas")
    public ResponseEntity<Areas> createAreas(@RequestBody Areas areas) throws URISyntaxException {
        log.debug("REST request to save Areas : {}", areas);
        if (areas.getId() != null) {
            throw new BadRequestAlertException("A new areas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Areas result = areasRepository.save(areas);
        return ResponseEntity.created(new URI("/api/areas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /areas} : Updates an existing areas.
     *
     * @param areas the areas to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated areas,
     * or with status {@code 400 (Bad Request)} if the areas is not valid,
     * or with status {@code 500 (Internal Server Error)} if the areas couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/areas")
    public ResponseEntity<Areas> updateAreas(@RequestBody Areas areas) throws URISyntaxException {
        log.debug("REST request to update Areas : {}", areas);
        if (areas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Areas result = areasRepository.save(areas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, areas.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /areas} : get all the areas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of areas in body.
     */
    @GetMapping("/areas")
    public List<Areas> getAllAreas() {
        log.debug("REST request to get all Areas");
        return areasRepository.findAll();
    }

    /**
     * {@code GET  /areas/:id} : get the "id" areas.
     *
     * @param id the id of the areas to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the areas, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/areas/{id}")
    public ResponseEntity<Areas> getAreas(@PathVariable Long id) {
        log.debug("REST request to get Areas : {}", id);
        Optional<Areas> areas = areasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(areas);
    }

    /**
     * {@code DELETE  /areas/:id} : delete the "id" areas.
     *
     * @param id the id of the areas to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/areas/{id}")
    public ResponseEntity<Void> deleteAreas(@PathVariable Long id) {
        log.debug("REST request to delete Areas : {}", id);
        areasRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
