package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.ContactoUsuarios;
import com.beltran.gestionempleados.repository.ContactoUsuariosRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.ContactoUsuarios}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ContactoUsuariosResource {

    private final Logger log = LoggerFactory.getLogger(ContactoUsuariosResource.class);

    private static final String ENTITY_NAME = "contactoUsuarios";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContactoUsuariosRepository contactoUsuariosRepository;

    public ContactoUsuariosResource(ContactoUsuariosRepository contactoUsuariosRepository) {
        this.contactoUsuariosRepository = contactoUsuariosRepository;
    }

    /**
     * {@code POST  /contacto-usuarios} : Create a new contactoUsuarios.
     *
     * @param contactoUsuarios the contactoUsuarios to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contactoUsuarios, or with status {@code 400 (Bad Request)} if the contactoUsuarios has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contacto-usuarios")
    public ResponseEntity<ContactoUsuarios> createContactoUsuarios(@RequestBody ContactoUsuarios contactoUsuarios) throws URISyntaxException {
        log.debug("REST request to save ContactoUsuarios : {}", contactoUsuarios);
        if (contactoUsuarios.getId() != null) {
            throw new BadRequestAlertException("A new contactoUsuarios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContactoUsuarios result = contactoUsuariosRepository.save(contactoUsuarios);
        return ResponseEntity.created(new URI("/api/contacto-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contacto-usuarios} : Updates an existing contactoUsuarios.
     *
     * @param contactoUsuarios the contactoUsuarios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contactoUsuarios,
     * or with status {@code 400 (Bad Request)} if the contactoUsuarios is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contactoUsuarios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contacto-usuarios")
    public ResponseEntity<ContactoUsuarios> updateContactoUsuarios(@RequestBody ContactoUsuarios contactoUsuarios) throws URISyntaxException {
        log.debug("REST request to update ContactoUsuarios : {}", contactoUsuarios);
        if (contactoUsuarios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContactoUsuarios result = contactoUsuariosRepository.save(contactoUsuarios);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contactoUsuarios.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contacto-usuarios} : get all the contactoUsuarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contactoUsuarios in body.
     */
    @GetMapping("/contacto-usuarios")
    public List<ContactoUsuarios> getAllContactoUsuarios() {
        log.debug("REST request to get all ContactoUsuarios");
        return contactoUsuariosRepository.findAll();
    }

    /**
     * {@code GET  /contacto-usuarios/:id} : get the "id" contactoUsuarios.
     *
     * @param id the id of the contactoUsuarios to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contactoUsuarios, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contacto-usuarios/{id}")
    public ResponseEntity<ContactoUsuarios> getContactoUsuarios(@PathVariable Long id) {
        log.debug("REST request to get ContactoUsuarios : {}", id);
        Optional<ContactoUsuarios> contactoUsuarios = contactoUsuariosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contactoUsuarios);
    }

    /**
     * {@code DELETE  /contacto-usuarios/:id} : delete the "id" contactoUsuarios.
     *
     * @param id the id of the contactoUsuarios to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contacto-usuarios/{id}")
    public ResponseEntity<Void> deleteContactoUsuarios(@PathVariable Long id) {
        log.debug("REST request to delete ContactoUsuarios : {}", id);
        contactoUsuariosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
