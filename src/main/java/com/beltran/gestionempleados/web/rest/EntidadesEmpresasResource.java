package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.EntidadesEmpresas;
import com.beltran.gestionempleados.repository.EntidadesEmpresasRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.EntidadesEmpresas}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EntidadesEmpresasResource {

    private final Logger log = LoggerFactory.getLogger(EntidadesEmpresasResource.class);

    private static final String ENTITY_NAME = "entidadesEmpresas";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntidadesEmpresasRepository entidadesEmpresasRepository;

    public EntidadesEmpresasResource(EntidadesEmpresasRepository entidadesEmpresasRepository) {
        this.entidadesEmpresasRepository = entidadesEmpresasRepository;
    }

    /**
     * {@code POST  /entidades-empresas} : Create a new entidadesEmpresas.
     *
     * @param entidadesEmpresas the entidadesEmpresas to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new entidadesEmpresas, or with status {@code 400 (Bad Request)} if the entidadesEmpresas has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entidades-empresas")
    public ResponseEntity<EntidadesEmpresas> createEntidadesEmpresas(@RequestBody EntidadesEmpresas entidadesEmpresas) throws URISyntaxException {
        log.debug("REST request to save EntidadesEmpresas : {}", entidadesEmpresas);
        if (entidadesEmpresas.getId() != null) {
            throw new BadRequestAlertException("A new entidadesEmpresas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EntidadesEmpresas result = entidadesEmpresasRepository.save(entidadesEmpresas);
        return ResponseEntity.created(new URI("/api/entidades-empresas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entidades-empresas} : Updates an existing entidadesEmpresas.
     *
     * @param entidadesEmpresas the entidadesEmpresas to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entidadesEmpresas,
     * or with status {@code 400 (Bad Request)} if the entidadesEmpresas is not valid,
     * or with status {@code 500 (Internal Server Error)} if the entidadesEmpresas couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entidades-empresas")
    public ResponseEntity<EntidadesEmpresas> updateEntidadesEmpresas(@RequestBody EntidadesEmpresas entidadesEmpresas) throws URISyntaxException {
        log.debug("REST request to update EntidadesEmpresas : {}", entidadesEmpresas);
        if (entidadesEmpresas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EntidadesEmpresas result = entidadesEmpresasRepository.save(entidadesEmpresas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entidadesEmpresas.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /entidades-empresas} : get all the entidadesEmpresas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entidadesEmpresas in body.
     */
    @GetMapping("/entidades-empresas")
    public List<EntidadesEmpresas> getAllEntidadesEmpresas() {
        log.debug("REST request to get all EntidadesEmpresas");
        return entidadesEmpresasRepository.findAll();
    }

    /**
     * {@code GET  /entidades-empresas/:id} : get the "id" entidadesEmpresas.
     *
     * @param id the id of the entidadesEmpresas to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entidadesEmpresas, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entidades-empresas/{id}")
    public ResponseEntity<EntidadesEmpresas> getEntidadesEmpresas(@PathVariable Long id) {
        log.debug("REST request to get EntidadesEmpresas : {}", id);
        Optional<EntidadesEmpresas> entidadesEmpresas = entidadesEmpresasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(entidadesEmpresas);
    }

    /**
     * {@code DELETE  /entidades-empresas/:id} : delete the "id" entidadesEmpresas.
     *
     * @param id the id of the entidadesEmpresas to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entidades-empresas/{id}")
    public ResponseEntity<Void> deleteEntidadesEmpresas(@PathVariable Long id) {
        log.debug("REST request to delete EntidadesEmpresas : {}", id);
        entidadesEmpresasRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
