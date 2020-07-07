package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Configuraciones;
import com.beltran.gestionempleados.repository.ConfiguracionesRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Configuraciones}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConfiguracionesResource {

    private final Logger log = LoggerFactory.getLogger(ConfiguracionesResource.class);

    private static final String ENTITY_NAME = "configuraciones";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConfiguracionesRepository configuracionesRepository;

    public ConfiguracionesResource(ConfiguracionesRepository configuracionesRepository) {
        this.configuracionesRepository = configuracionesRepository;
    }

    /**
     * {@code POST  /configuraciones} : Create a new configuraciones.
     *
     * @param configuraciones the configuraciones to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new configuraciones, or with status {@code 400 (Bad Request)} if the configuraciones has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/configuraciones")
    public ResponseEntity<Configuraciones> createConfiguraciones(@RequestBody Configuraciones configuraciones) throws URISyntaxException {
        log.debug("REST request to save Configuraciones : {}", configuraciones);
        if (configuraciones.getId() != null) {
            throw new BadRequestAlertException("A new configuraciones cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Configuraciones result = configuracionesRepository.save(configuraciones);
        return ResponseEntity.created(new URI("/api/configuraciones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /configuraciones} : Updates an existing configuraciones.
     *
     * @param configuraciones the configuraciones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated configuraciones,
     * or with status {@code 400 (Bad Request)} if the configuraciones is not valid,
     * or with status {@code 500 (Internal Server Error)} if the configuraciones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/configuraciones")
    public ResponseEntity<Configuraciones> updateConfiguraciones(@RequestBody Configuraciones configuraciones) throws URISyntaxException {
        log.debug("REST request to update Configuraciones : {}", configuraciones);
        if (configuraciones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Configuraciones result = configuracionesRepository.save(configuraciones);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, configuraciones.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /configuraciones} : get all the configuraciones.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of configuraciones in body.
     */
    @GetMapping("/configuraciones")
    public List<Configuraciones> getAllConfiguraciones() {
        log.debug("REST request to get all Configuraciones");
        return configuracionesRepository.findAll();
    }

    /**
     * {@code GET  /configuraciones/:id} : get the "id" configuraciones.
     *
     * @param id the id of the configuraciones to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the configuraciones, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/configuraciones/{id}")
    public ResponseEntity<Configuraciones> getConfiguraciones(@PathVariable Long id) {
        log.debug("REST request to get Configuraciones : {}", id);
        Optional<Configuraciones> configuraciones = configuracionesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(configuraciones);
    }

    /**
     * {@code DELETE  /configuraciones/:id} : delete the "id" configuraciones.
     *
     * @param id the id of the configuraciones to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/configuraciones/{id}")
    public ResponseEntity<Void> deleteConfiguraciones(@PathVariable Long id) {
        log.debug("REST request to delete Configuraciones : {}", id);
        configuracionesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
