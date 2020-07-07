package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.TipoDocumentos;
import com.beltran.gestionempleados.repository.TipoDocumentosRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.TipoDocumentos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoDocumentosResource {

    private final Logger log = LoggerFactory.getLogger(TipoDocumentosResource.class);

    private static final String ENTITY_NAME = "tipoDocumentos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoDocumentosRepository tipoDocumentosRepository;

    public TipoDocumentosResource(TipoDocumentosRepository tipoDocumentosRepository) {
        this.tipoDocumentosRepository = tipoDocumentosRepository;
    }

    /**
     * {@code POST  /tipo-documentos} : Create a new tipoDocumentos.
     *
     * @param tipoDocumentos the tipoDocumentos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoDocumentos, or with status {@code 400 (Bad Request)} if the tipoDocumentos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-documentos")
    public ResponseEntity<TipoDocumentos> createTipoDocumentos(@RequestBody TipoDocumentos tipoDocumentos) throws URISyntaxException {
        log.debug("REST request to save TipoDocumentos : {}", tipoDocumentos);
        if (tipoDocumentos.getId() != null) {
            throw new BadRequestAlertException("A new tipoDocumentos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoDocumentos result = tipoDocumentosRepository.save(tipoDocumentos);
        return ResponseEntity.created(new URI("/api/tipo-documentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-documentos} : Updates an existing tipoDocumentos.
     *
     * @param tipoDocumentos the tipoDocumentos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDocumentos,
     * or with status {@code 400 (Bad Request)} if the tipoDocumentos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoDocumentos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-documentos")
    public ResponseEntity<TipoDocumentos> updateTipoDocumentos(@RequestBody TipoDocumentos tipoDocumentos) throws URISyntaxException {
        log.debug("REST request to update TipoDocumentos : {}", tipoDocumentos);
        if (tipoDocumentos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoDocumentos result = tipoDocumentosRepository.save(tipoDocumentos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoDocumentos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-documentos} : get all the tipoDocumentos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoDocumentos in body.
     */
    @GetMapping("/tipo-documentos")
    public List<TipoDocumentos> getAllTipoDocumentos() {
        log.debug("REST request to get all TipoDocumentos");
        return tipoDocumentosRepository.findAll();
    }

    /**
     * {@code GET  /tipo-documentos/:id} : get the "id" tipoDocumentos.
     *
     * @param id the id of the tipoDocumentos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoDocumentos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-documentos/{id}")
    public ResponseEntity<TipoDocumentos> getTipoDocumentos(@PathVariable Long id) {
        log.debug("REST request to get TipoDocumentos : {}", id);
        Optional<TipoDocumentos> tipoDocumentos = tipoDocumentosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoDocumentos);
    }

    /**
     * {@code DELETE  /tipo-documentos/:id} : delete the "id" tipoDocumentos.
     *
     * @param id the id of the tipoDocumentos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-documentos/{id}")
    public ResponseEntity<Void> deleteTipoDocumentos(@PathVariable Long id) {
        log.debug("REST request to delete TipoDocumentos : {}", id);
        tipoDocumentosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
