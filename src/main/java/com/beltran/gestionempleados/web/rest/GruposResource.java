package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Grupos;
import com.beltran.gestionempleados.repository.GruposRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Grupos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GruposResource {

    private final Logger log = LoggerFactory.getLogger(GruposResource.class);

    private static final String ENTITY_NAME = "grupos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GruposRepository gruposRepository;

    public GruposResource(GruposRepository gruposRepository) {
        this.gruposRepository = gruposRepository;
    }

    /**
     * {@code POST  /grupos} : Create a new grupos.
     *
     * @param grupos the grupos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new grupos, or with status {@code 400 (Bad Request)} if the grupos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/grupos")
    public ResponseEntity<Grupos> createGrupos(@RequestBody Grupos grupos) throws URISyntaxException {
        log.debug("REST request to save Grupos : {}", grupos);
        if (grupos.getId() != null) {
            throw new BadRequestAlertException("A new grupos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Grupos result = gruposRepository.save(grupos);
        return ResponseEntity.created(new URI("/api/grupos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grupos} : Updates an existing grupos.
     *
     * @param grupos the grupos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupos,
     * or with status {@code 400 (Bad Request)} if the grupos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the grupos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/grupos")
    public ResponseEntity<Grupos> updateGrupos(@RequestBody Grupos grupos) throws URISyntaxException {
        log.debug("REST request to update Grupos : {}", grupos);
        if (grupos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Grupos result = gruposRepository.save(grupos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grupos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /grupos} : get all the grupos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grupos in body.
     */
    @GetMapping("/grupos")
    public List<Grupos> getAllGrupos() {
        log.debug("REST request to get all Grupos");
        return gruposRepository.findAll();
    }

    /**
     * {@code GET  /grupos/:id} : get the "id" grupos.
     *
     * @param id the id of the grupos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the grupos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/grupos/{id}")
    public ResponseEntity<Grupos> getGrupos(@PathVariable Long id) {
        log.debug("REST request to get Grupos : {}", id);
        Optional<Grupos> grupos = gruposRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(grupos);
    }

    /**
     * {@code DELETE  /grupos/:id} : delete the "id" grupos.
     *
     * @param id the id of the grupos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/grupos/{id}")
    public ResponseEntity<Void> deleteGrupos(@PathVariable Long id) {
        log.debug("REST request to delete Grupos : {}", id);
        gruposRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
