package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Paises;
import com.beltran.gestionempleados.repository.PaisesRepository;
import com.beltran.gestionempleados.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Paises}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PaisesResource {

    private final Logger log = LoggerFactory.getLogger(PaisesResource.class);

    private static final String ENTITY_NAME = "paises";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaisesRepository paisesRepository;

    public PaisesResource(PaisesRepository paisesRepository) {
        this.paisesRepository = paisesRepository;
    }

    /**
     * {@code POST  /paises} : Create a new paises.
     *
     * @param paises the paises to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paises, or with status {@code 400 (Bad Request)} if the paises has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/paises")
    public ResponseEntity<Paises> createPaises(@RequestBody Paises paises) throws URISyntaxException {
        log.debug("REST request to save Paises : {}", paises);
        if (paises.getId() != null) {
            throw new BadRequestAlertException("A new paises cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Paises result = paisesRepository.save(paises);
        return ResponseEntity.created(new URI("/api/paises/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /paises} : Updates an existing paises.
     *
     * @param paises the paises to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paises,
     * or with status {@code 400 (Bad Request)} if the paises is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paises couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/paises")
    public ResponseEntity<Paises> updatePaises(@RequestBody Paises paises) throws URISyntaxException {
        log.debug("REST request to update Paises : {}", paises);
        if (paises.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Paises result = paisesRepository.save(paises);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paises.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /paises} : get all the paises.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paises in body.
     */
    @GetMapping("/paises")
    public ResponseEntity<List<Paises>> getAllPaises(Pageable pageable) {
        log.debug("REST request to get a page of Paises");
        Page<Paises> page = paisesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/paises/all")
    public List<Paises> getAll() {
        log.debug("REST request to get a page of Paises");
        return  paisesRepository.findAll();
    }

    /**
     * {@code GET  /paises/:id} : get the "id" paises.
     *
     * @param id the id of the paises to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paises, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/paises/{id}")
    public ResponseEntity<Paises> getPaises(@PathVariable Long id) {
        log.debug("REST request to get Paises : {}", id);
        Optional<Paises> paises = paisesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(paises);
    }

    /**
     * {@code DELETE  /paises/:id} : delete the "id" paises.
     *
     * @param id the id of the paises to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/paises/{id}")
    public ResponseEntity<Void> deletePaises(@PathVariable Long id) {
        log.debug("REST request to delete Paises : {}", id);
        paisesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
