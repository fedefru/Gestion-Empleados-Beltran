package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.GrupoUsuarios;
import com.beltran.gestionempleados.repository.GrupoUsuariosRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.GrupoUsuarios}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GrupoUsuariosResource {

    private final Logger log = LoggerFactory.getLogger(GrupoUsuariosResource.class);

    private static final String ENTITY_NAME = "grupoUsuarios";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GrupoUsuariosRepository grupoUsuariosRepository;

    public GrupoUsuariosResource(GrupoUsuariosRepository grupoUsuariosRepository) {
        this.grupoUsuariosRepository = grupoUsuariosRepository;
    }

    /**
     * {@code POST  /grupo-usuarios} : Create a new grupoUsuarios.
     *
     * @param grupoUsuarios the grupoUsuarios to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new grupoUsuarios, or with status {@code 400 (Bad Request)} if the grupoUsuarios has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/grupo-usuarios")
    public ResponseEntity<GrupoUsuarios> createGrupoUsuarios(@RequestBody GrupoUsuarios grupoUsuarios) throws URISyntaxException {
        log.debug("REST request to save GrupoUsuarios : {}", grupoUsuarios);
        if (grupoUsuarios.getId() != null) {
            throw new BadRequestAlertException("A new grupoUsuarios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GrupoUsuarios result = grupoUsuariosRepository.save(grupoUsuarios);
        return ResponseEntity.created(new URI("/api/grupo-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grupo-usuarios} : Updates an existing grupoUsuarios.
     *
     * @param grupoUsuarios the grupoUsuarios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoUsuarios,
     * or with status {@code 400 (Bad Request)} if the grupoUsuarios is not valid,
     * or with status {@code 500 (Internal Server Error)} if the grupoUsuarios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/grupo-usuarios")
    public ResponseEntity<GrupoUsuarios> updateGrupoUsuarios(@RequestBody GrupoUsuarios grupoUsuarios) throws URISyntaxException {
        log.debug("REST request to update GrupoUsuarios : {}", grupoUsuarios);
        if (grupoUsuarios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GrupoUsuarios result = grupoUsuariosRepository.save(grupoUsuarios);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grupoUsuarios.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /grupo-usuarios} : get all the grupoUsuarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grupoUsuarios in body.
     */
    @GetMapping("/grupo-usuarios")
    public List<GrupoUsuarios> getAllGrupoUsuarios() {
        log.debug("REST request to get all GrupoUsuarios");
        return grupoUsuariosRepository.findAll();
    }

    /**
     * {@code GET  /grupo-usuarios/:id} : get the "id" grupoUsuarios.
     *
     * @param id the id of the grupoUsuarios to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the grupoUsuarios, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/grupo-usuarios/{id}")
    public ResponseEntity<GrupoUsuarios> getGrupoUsuarios(@PathVariable Long id) {
        log.debug("REST request to get GrupoUsuarios : {}", id);
        Optional<GrupoUsuarios> grupoUsuarios = grupoUsuariosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(grupoUsuarios);
    }

    /**
     * {@code DELETE  /grupo-usuarios/:id} : delete the "id" grupoUsuarios.
     *
     * @param id the id of the grupoUsuarios to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/grupo-usuarios/{id}")
    public ResponseEntity<Void> deleteGrupoUsuarios(@PathVariable Long id) {
        log.debug("REST request to delete GrupoUsuarios : {}", id);
        grupoUsuariosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
