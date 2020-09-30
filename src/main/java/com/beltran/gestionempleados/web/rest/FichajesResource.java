package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.Fichajes;
import com.beltran.gestionempleados.repository.FichajesRepository;
import com.beltran.gestionempleados.service.FichajeService;
import com.beltran.gestionempleados.web.rest.errors.BadRequestAlertException;

import com.hazelcast.concurrent.lock.operations.LocalLockCleanupOperation;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import net.bytebuddy.asm.Advice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.beltran.gestionempleados.domain.Fichajes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FichajesResource {

    @Autowired
    private FichajeService      fichajeService;

    private final Logger log = LoggerFactory.getLogger(FichajesResource.class);

    private static final String ENTITY_NAME = "fichajes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FichajesRepository fichajesRepository;

    public FichajesResource(FichajesRepository fichajesRepository) {
        this.fichajesRepository = fichajesRepository;
    }

    /**
     * {@code POST  /fichajes} : Create a new fichajes.
     *
     * @param fichajes the fichajes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fichajes, or with status {@code 400 (Bad Request)} if the fichajes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fichajes")
    public ResponseEntity<Fichajes> createFichajes(@RequestBody Fichajes fichajes) throws URISyntaxException {
        log.debug("REST request to save Fichajes : {}", fichajes);
        if (fichajes.getId() != null) {
            throw new BadRequestAlertException("A new fichajes cannot already have an ID", ENTITY_NAME, "idexists");
        }

        fichajes.setAccion(fichajeService.verificarUltimaAccion(fichajes.getUsuario()));

        Fichajes result = fichajesRepository.save(fichajes);

        return ResponseEntity.created(new URI("/api/fichajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fichajes} : Updates an existing fichajes.
     *
     * @param fichajes the fichajes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fichajes,
     * or with status {@code 400 (Bad Request)} if the fichajes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fichajes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fichajes")
    public ResponseEntity<Fichajes> updateFichajes(@RequestBody Fichajes fichajes) throws URISyntaxException {
        log.debug("REST request to update Fichajes : {}", fichajes);
        if (fichajes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fichajes result = fichajesRepository.save(fichajes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fichajes.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fichajes} : get all the fichajes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fichajes in body.
     */
    @GetMapping("/fichajes")
    public List<Fichajes> getAllFichajes() {
        log.debug("REST request to get all Fichajes");
        return fichajesRepository.findAll();
    }

    /**
     * {@code GET  /fichajes/:id} : get the "id" fichajes.
     *
     * @param id the id of the fichajes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fichajes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fichajes/{id}")
    public ResponseEntity<Fichajes> getFichajes(@PathVariable Long id) {
        log.debug("REST request to get Fichajes : {}", id);
        Optional<Fichajes> fichajes = fichajesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fichajes);
    }

    @GetMapping("/fichajes/rutaimagen/{idUsuarioImagen}")
    public List<String> getRutaImagenById(@PathVariable String idUsuarioImagen) {
        log.debug("REST request to get Fichajes : {}", idUsuarioImagen);
        try {
            List<String> rutas = fichajesRepository.findRutasById(idUsuarioImagen);
            return rutas;
        }catch (Exception e){
            return null;
        }
    }

    /**
     * {@code DELETE  /fichajes/:id} : delete the "id" fichajes.
     *
     * @param id the id of the fichajes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fichajes/{id}")
    public ResponseEntity<Void> deleteFichajes(@PathVariable Long id) {
        log.debug("REST request to delete Fichajes : {}", id);
        fichajesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
