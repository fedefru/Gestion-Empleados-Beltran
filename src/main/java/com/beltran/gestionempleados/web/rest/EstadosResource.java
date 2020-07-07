package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Estados;
import com.beltran.gestionempleados.repository.EstadosRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Estados}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EstadosResource {

    private final Logger log = LoggerFactory.getLogger(EstadosResource.class);

    private static final String ENTITY_NAME = "estados";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadosRepository estadosRepository;

    public EstadosResource(EstadosRepository estadosRepository) {
        this.estadosRepository = estadosRepository;
    }

    /**
     * {@code POST  /estados} : Create a new estados.
     *
     * @param estados the estados to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estados, or with status {@code 400 (Bad Request)} if the estados has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estados")
    public ResponseEntity<Estados> createEstados(@RequestBody Estados estados) throws URISyntaxException {
        log.debug("REST request to save Estados : {}", estados);
        if (estados.getId() != null) {
            throw new BadRequestAlertException("A new estados cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Estados result = estadosRepository.save(estados);
        return ResponseEntity.created(new URI("/api/estados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estados} : Updates an existing estados.
     *
     * @param estados the estados to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estados,
     * or with status {@code 400 (Bad Request)} if the estados is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estados couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estados")
    public ResponseEntity<Estados> updateEstados(@RequestBody Estados estados) throws URISyntaxException {
        log.debug("REST request to update Estados : {}", estados);
        if (estados.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Estados result = estadosRepository.save(estados);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, estados.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estados} : get all the estados.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estados in body.
     */
    @GetMapping("/estados")
    public List<Estados> getAllEstados() {
        log.debug("REST request to get all Estados");
        return estadosRepository.findAll();
    }

    /**
     * {@code GET  /estados/:id} : get the "id" estados.
     *
     * @param id the id of the estados to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estados, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estados/{id}")
    public ResponseEntity<Estados> getEstados(@PathVariable Long id) {
        log.debug("REST request to get Estados : {}", id);
        Optional<Estados> estados = estadosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(estados);
    }

    /**
     * {@code DELETE  /estados/:id} : delete the "id" estados.
     *
     * @param id the id of the estados to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estados/{id}")
    public ResponseEntity<Void> deleteEstados(@PathVariable Long id) {
        log.debug("REST request to delete Estados : {}", id);
        estadosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
