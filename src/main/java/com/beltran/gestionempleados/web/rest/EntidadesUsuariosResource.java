package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.EntidadesUsuarios;
import com.beltran.gestionempleados.repository.EntidadesUsuariosRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.EntidadesUsuarios}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EntidadesUsuariosResource {

    private final Logger log = LoggerFactory.getLogger(EntidadesUsuariosResource.class);

    private static final String ENTITY_NAME = "entidadesUsuarios";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntidadesUsuariosRepository entidadesUsuariosRepository;

    public EntidadesUsuariosResource(EntidadesUsuariosRepository entidadesUsuariosRepository) {
        this.entidadesUsuariosRepository = entidadesUsuariosRepository;
    }

    /**
     * {@code POST  /entidades-usuarios} : Create a new entidadesUsuarios.
     *
     * @param entidadesUsuarios the entidadesUsuarios to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new entidadesUsuarios, or with status {@code 400 (Bad Request)} if the entidadesUsuarios has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entidades-usuarios")
    public ResponseEntity<EntidadesUsuarios> createEntidadesUsuarios(@RequestBody EntidadesUsuarios entidadesUsuarios) throws URISyntaxException {
        log.debug("REST request to save EntidadesUsuarios : {}", entidadesUsuarios);
        if (entidadesUsuarios.getId() != null) {
            throw new BadRequestAlertException("A new entidadesUsuarios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EntidadesUsuarios result = entidadesUsuariosRepository.save(entidadesUsuarios);
        return ResponseEntity.created(new URI("/api/entidades-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entidades-usuarios} : Updates an existing entidadesUsuarios.
     *
     * @param entidadesUsuarios the entidadesUsuarios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entidadesUsuarios,
     * or with status {@code 400 (Bad Request)} if the entidadesUsuarios is not valid,
     * or with status {@code 500 (Internal Server Error)} if the entidadesUsuarios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entidades-usuarios")
    public ResponseEntity<EntidadesUsuarios> updateEntidadesUsuarios(@RequestBody EntidadesUsuarios entidadesUsuarios) throws URISyntaxException {
        log.debug("REST request to update EntidadesUsuarios : {}", entidadesUsuarios);
        if (entidadesUsuarios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EntidadesUsuarios result = entidadesUsuariosRepository.save(entidadesUsuarios);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entidadesUsuarios.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /entidades-usuarios} : get all the entidadesUsuarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entidadesUsuarios in body.
     */
    @GetMapping("/entidades-usuarios")
    public List<EntidadesUsuarios> getAllEntidadesUsuarios() {
        log.debug("REST request to get all EntidadesUsuarios");
        return entidadesUsuariosRepository.findAll();
    }

    /**
     * {@code GET  /entidades-usuarios/:id} : get the "id" entidadesUsuarios.
     *
     * @param id the id of the entidadesUsuarios to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entidadesUsuarios, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entidades-usuarios/{id}")
    public ResponseEntity<EntidadesUsuarios> getEntidadesUsuarios(@PathVariable Long id) {
        log.debug("REST request to get EntidadesUsuarios : {}", id);
        Optional<EntidadesUsuarios> entidadesUsuarios = entidadesUsuariosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(entidadesUsuarios);
    }

    /**
     * {@code DELETE  /entidades-usuarios/:id} : delete the "id" entidadesUsuarios.
     *
     * @param id the id of the entidadesUsuarios to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entidades-usuarios/{id}")
    public ResponseEntity<Void> deleteEntidadesUsuarios(@PathVariable Long id) {
        log.debug("REST request to delete EntidadesUsuarios : {}", id);
        entidadesUsuariosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
