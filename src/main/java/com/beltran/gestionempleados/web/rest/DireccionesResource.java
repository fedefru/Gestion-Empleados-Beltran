package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Direcciones;
import com.beltran.gestionempleados.repository.DireccionesRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Direcciones}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DireccionesResource {

    private final Logger log = LoggerFactory.getLogger(DireccionesResource.class);

    private static final String ENTITY_NAME = "direcciones";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DireccionesRepository direccionesRepository;

    public DireccionesResource(DireccionesRepository direccionesRepository) {
        this.direccionesRepository = direccionesRepository;
    }

    /**
     * {@code POST  /direcciones} : Create a new direcciones.
     *
     * @param direcciones the direcciones to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new direcciones, or with status {@code 400 (Bad Request)} if the direcciones has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/direcciones")
    public ResponseEntity<Direcciones> createDirecciones(@RequestBody Direcciones direcciones) throws URISyntaxException {
        log.debug("REST request to save Direcciones : {}", direcciones);
        if (direcciones.getId() != null) {
            throw new BadRequestAlertException("A new direcciones cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Direcciones result = direccionesRepository.save(direcciones);
        return ResponseEntity.created(new URI("/api/direcciones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /direcciones} : Updates an existing direcciones.
     *
     * @param direcciones the direcciones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated direcciones,
     * or with status {@code 400 (Bad Request)} if the direcciones is not valid,
     * or with status {@code 500 (Internal Server Error)} if the direcciones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/direcciones")
    public ResponseEntity<Direcciones> updateDirecciones(@RequestBody Direcciones direcciones) throws URISyntaxException {
        log.debug("REST request to update Direcciones : {}", direcciones);
        if (direcciones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Direcciones result = direccionesRepository.save(direcciones);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, direcciones.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /direcciones} : get all the direcciones.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of direcciones in body.
     */
    @GetMapping("/direcciones")
    public List<Direcciones> getAllDirecciones() {
        log.debug("REST request to get all Direcciones");
        return direccionesRepository.findAll();
    }

    /**
     * {@code GET  /direcciones/:id} : get the "id" direcciones.
     *
     * @param id the id of the direcciones to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the direcciones, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/direcciones/{id}")
    public ResponseEntity<Direcciones> getDirecciones(@PathVariable Long id) {
        log.debug("REST request to get Direcciones : {}", id);
        Optional<Direcciones> direcciones = direccionesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(direcciones);
    }

    /**
     * {@code DELETE  /direcciones/:id} : delete the "id" direcciones.
     *
     * @param id the id of the direcciones to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/direcciones/{id}")
    public ResponseEntity<Void> deleteDirecciones(@PathVariable Long id) {
        log.debug("REST request to delete Direcciones : {}", id);
        direccionesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
