package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.PermisosGrupos;
import com.beltran.gestionempleados.repository.PermisosGruposRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.PermisosGrupos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PermisosGruposResource {

    private final Logger log = LoggerFactory.getLogger(PermisosGruposResource.class);

    private static final String ENTITY_NAME = "permisosGrupos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PermisosGruposRepository permisosGruposRepository;

    public PermisosGruposResource(PermisosGruposRepository permisosGruposRepository) {
        this.permisosGruposRepository = permisosGruposRepository;
    }

    /**
     * {@code POST  /permisos-grupos} : Create a new permisosGrupos.
     *
     * @param permisosGrupos the permisosGrupos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new permisosGrupos, or with status {@code 400 (Bad Request)} if the permisosGrupos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/permisos-grupos")
    public ResponseEntity<PermisosGrupos> createPermisosGrupos(@RequestBody PermisosGrupos permisosGrupos) throws URISyntaxException {
        log.debug("REST request to save PermisosGrupos : {}", permisosGrupos);
        if (permisosGrupos.getId() != null) {
            throw new BadRequestAlertException("A new permisosGrupos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PermisosGrupos result = permisosGruposRepository.save(permisosGrupos);
        return ResponseEntity.created(new URI("/api/permisos-grupos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /permisos-grupos} : Updates an existing permisosGrupos.
     *
     * @param permisosGrupos the permisosGrupos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated permisosGrupos,
     * or with status {@code 400 (Bad Request)} if the permisosGrupos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the permisosGrupos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/permisos-grupos")
    public ResponseEntity<PermisosGrupos> updatePermisosGrupos(@RequestBody PermisosGrupos permisosGrupos) throws URISyntaxException {
        log.debug("REST request to update PermisosGrupos : {}", permisosGrupos);
        if (permisosGrupos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PermisosGrupos result = permisosGruposRepository.save(permisosGrupos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, permisosGrupos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /permisos-grupos} : get all the permisosGrupos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of permisosGrupos in body.
     */
    @GetMapping("/permisos-grupos")
    public List<PermisosGrupos> getAllPermisosGrupos() {
        log.debug("REST request to get all PermisosGrupos");
        return permisosGruposRepository.findAll();
    }

    /**
     * {@code GET  /permisos-grupos/:id} : get the "id" permisosGrupos.
     *
     * @param id the id of the permisosGrupos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the permisosGrupos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/permisos-grupos/{id}")
    public ResponseEntity<PermisosGrupos> getPermisosGrupos(@PathVariable Long id) {
        log.debug("REST request to get PermisosGrupos : {}", id);
        Optional<PermisosGrupos> permisosGrupos = permisosGruposRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(permisosGrupos);
    }

    /**
     * {@code DELETE  /permisos-grupos/:id} : delete the "id" permisosGrupos.
     *
     * @param id the id of the permisosGrupos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/permisos-grupos/{id}")
    public ResponseEntity<Void> deletePermisosGrupos(@PathVariable Long id) {
        log.debug("REST request to delete PermisosGrupos : {}", id);
        permisosGruposRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
