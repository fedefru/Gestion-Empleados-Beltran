package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.TipoDireccion;
import com.beltran.gestionempleados.repository.TipoDireccionRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.TipoDireccion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoDireccionResource {

    private final Logger log = LoggerFactory.getLogger(TipoDireccionResource.class);

    private static final String ENTITY_NAME = "tipoDireccion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoDireccionRepository tipoDireccionRepository;

    public TipoDireccionResource(TipoDireccionRepository tipoDireccionRepository) {
        this.tipoDireccionRepository = tipoDireccionRepository;
    }

    /**
     * {@code POST  /tipo-direccions} : Create a new tipoDireccion.
     *
     * @param tipoDireccion the tipoDireccion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoDireccion, or with status {@code 400 (Bad Request)} if the tipoDireccion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-direccions")
    public ResponseEntity<TipoDireccion> createTipoDireccion(@RequestBody TipoDireccion tipoDireccion) throws URISyntaxException {
        log.debug("REST request to save TipoDireccion : {}", tipoDireccion);
        if (tipoDireccion.getId() != null) {
            throw new BadRequestAlertException("A new tipoDireccion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoDireccion result = tipoDireccionRepository.save(tipoDireccion);
        return ResponseEntity.created(new URI("/api/tipo-direccions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-direccions} : Updates an existing tipoDireccion.
     *
     * @param tipoDireccion the tipoDireccion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDireccion,
     * or with status {@code 400 (Bad Request)} if the tipoDireccion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoDireccion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-direccions")
    public ResponseEntity<TipoDireccion> updateTipoDireccion(@RequestBody TipoDireccion tipoDireccion) throws URISyntaxException {
        log.debug("REST request to update TipoDireccion : {}", tipoDireccion);
        if (tipoDireccion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoDireccion result = tipoDireccionRepository.save(tipoDireccion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoDireccion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-direccions} : get all the tipoDireccions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoDireccions in body.
     */
    @GetMapping("/tipo-direccions")
    public List<TipoDireccion> getAllTipoDireccions() {
        log.debug("REST request to get all TipoDireccions");
        return tipoDireccionRepository.findAll();
    }

    /**
     * {@code GET  /tipo-direccions/:id} : get the "id" tipoDireccion.
     *
     * @param id the id of the tipoDireccion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoDireccion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-direccions/{id}")
    public ResponseEntity<TipoDireccion> getTipoDireccion(@PathVariable Long id) {
        log.debug("REST request to get TipoDireccion : {}", id);
        Optional<TipoDireccion> tipoDireccion = tipoDireccionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoDireccion);
    }

    /**
     * {@code DELETE  /tipo-direccions/:id} : delete the "id" tipoDireccion.
     *
     * @param id the id of the tipoDireccion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-direccions/{id}")
    public ResponseEntity<Void> deleteTipoDireccion(@PathVariable Long id) {
        log.debug("REST request to delete TipoDireccion : {}", id);
        tipoDireccionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
