package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Puestos;
import com.beltran.gestionempleados.repository.PuestosRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Puestos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PuestosResource {

    private final Logger log = LoggerFactory.getLogger(PuestosResource.class);

    private static final String ENTITY_NAME = "puestos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PuestosRepository puestosRepository;

    public PuestosResource(PuestosRepository puestosRepository) {
        this.puestosRepository = puestosRepository;
    }

    /**
     * {@code POST  /puestos} : Create a new puestos.
     *
     * @param puestos the puestos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new puestos, or with status {@code 400 (Bad Request)} if the puestos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/puestos")
    public ResponseEntity<Puestos> createPuestos(@RequestBody Puestos puestos) throws URISyntaxException {
        log.debug("REST request to save Puestos : {}", puestos);
        if (puestos.getId() != null) {
            throw new BadRequestAlertException("A new puestos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Puestos result = puestosRepository.save(puestos);
        return ResponseEntity.created(new URI("/api/puestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /puestos} : Updates an existing puestos.
     *
     * @param puestos the puestos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated puestos,
     * or with status {@code 400 (Bad Request)} if the puestos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the puestos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/puestos")
    public ResponseEntity<Puestos> updatePuestos(@RequestBody Puestos puestos) throws URISyntaxException {
        log.debug("REST request to update Puestos : {}", puestos);
        if (puestos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Puestos result = puestosRepository.save(puestos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, puestos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /puestos} : get all the puestos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of puestos in body.
     */
    @GetMapping("/puestos")
    public List<Puestos> getAllPuestos() {
        log.debug("REST request to get all Puestos");
        return puestosRepository.findAll();
    }

    /**
     * {@code GET  /puestos/:id} : get the "id" puestos.
     *
     * @param id the id of the puestos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the puestos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/puestos/{id}")
    public ResponseEntity<Puestos> getPuestos(@PathVariable Long id) {
        log.debug("REST request to get Puestos : {}", id);
        Optional<Puestos> puestos = puestosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(puestos);
    }

    /**
     * {@code DELETE  /puestos/:id} : delete the "id" puestos.
     *
     * @param id the id of the puestos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/puestos/{id}")
    public ResponseEntity<Void> deletePuestos(@PathVariable Long id) {
        log.debug("REST request to delete Puestos : {}", id);
        puestosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
