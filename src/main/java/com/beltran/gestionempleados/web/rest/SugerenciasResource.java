package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Sugerencias;
import com.beltran.gestionempleados.repository.SugerenciasRepository;
import com.beltran.gestionempleados.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Transactional
public class SugerenciasResource {

    private final Logger log = LoggerFactory.getLogger(FichajesResource.class);

    private static final String ENTITY_NAME = "sugerencias";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    SugerenciasRepository   sugerenciasRepository;


    @PostMapping("/sugerencias")
    public ResponseEntity<Sugerencias> createSugerencias(@RequestBody Sugerencias sugerencia)throws URISyntaxException {
        log.debug("REST request to save Fichajes : {}", sugerencia);
        if (sugerencia.getId() != null) {
            throw new BadRequestAlertException("A new sugerencia cannot already have an ID", ENTITY_NAME, "idexists");
        }

        Sugerencias result = sugerenciasRepository.save(sugerencia);

        return ResponseEntity.created(new URI("/api/sugerencias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);

    }

    @PutMapping("/sugerencias")
    public ResponseEntity<Sugerencias> updateSugerencias(@RequestBody Sugerencias sugerencia) throws URISyntaxException {
        log.debug("REST request to update Fichajes : {}", sugerencia);
        if (sugerencia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sugerencias result = sugerenciasRepository.save(sugerencia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sugerencia.getId().toString()))
            .body(result);
    }

    @GetMapping("/sugerencias")
    public List<Sugerencias> getAllSugerencias() {
        log.debug("REST request to get all Sugerencias");
        return sugerenciasRepository.findAll();
    }

    @GetMapping("/sugerencias/{id}")
    public ResponseEntity<Sugerencias> getSugerencia(@PathVariable Long id) {
        log.debug("REST request to get Sugerencia : {}", id);
        Optional<Sugerencias> sugerencia = sugerenciasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sugerencia);
    }

    @DeleteMapping("/sugerencias/{id}")
    public ResponseEntity<Void> deleteSugerencia(@PathVariable Long id) {
        log.debug("REST request to delete Sugerencia : {}", id);
        sugerenciasRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

}
