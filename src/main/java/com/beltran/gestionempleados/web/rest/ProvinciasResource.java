package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Provincias;
import com.beltran.gestionempleados.repository.ProvinciasRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Provincias}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProvinciasResource {

    private final Logger log = LoggerFactory.getLogger(ProvinciasResource.class);

    private static final String ENTITY_NAME = "provincias";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProvinciasRepository provinciasRepository;

    public ProvinciasResource(ProvinciasRepository provinciasRepository) {
        this.provinciasRepository = provinciasRepository;
    }

    /**
     * {@code POST  /provincias} : Create a new provincias.
     *
     * @param provincias the provincias to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new provincias, or with status {@code 400 (Bad Request)} if the provincias has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/provincias")
    public ResponseEntity<Provincias> createProvincias(@RequestBody Provincias provincias) throws URISyntaxException {
        log.debug("REST request to save Provincias : {}", provincias);
        if (provincias.getId() != null) {
            throw new BadRequestAlertException("A new provincias cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Provincias result = provinciasRepository.save(provincias);
        return ResponseEntity.created(new URI("/api/provincias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /provincias} : Updates an existing provincias.
     *
     * @param provincias the provincias to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated provincias,
     * or with status {@code 400 (Bad Request)} if the provincias is not valid,
     * or with status {@code 500 (Internal Server Error)} if the provincias couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/provincias")
    public ResponseEntity<Provincias> updateProvincias(@RequestBody Provincias provincias) throws URISyntaxException {
        log.debug("REST request to update Provincias : {}", provincias);
        if (provincias.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Provincias result = provinciasRepository.save(provincias);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, provincias.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /provincias} : get all the provincias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of provincias in body.
     */
    @GetMapping("/provincias")
    public List<Provincias> getAllProvincias() {
        log.debug("REST request to get all Provincias");
        return provinciasRepository.findAll();
    }

    /**
     * {@code GET  /provincias/:id} : get the "id" provincias.
     *
     * @param id the id of the provincias to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the provincias, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/provincias/{id}")
    public ResponseEntity<Provincias> getProvincias(@PathVariable Long id) {
        log.debug("REST request to get Provincias : {}", id);
        Optional<Provincias> provincias = provinciasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(provincias);
    }

    /**
     * {@code DELETE  /provincias/:id} : delete the "id" provincias.
     *
     * @param id the id of the provincias to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/provincias/{id}")
    public ResponseEntity<Void> deleteProvincias(@PathVariable Long id) {
        log.debug("REST request to delete Provincias : {}", id);
        provinciasRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
