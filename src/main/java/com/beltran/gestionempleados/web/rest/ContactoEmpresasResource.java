package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.domain.ContactoEmpresas;
import com.beltran.gestionempleados.repository.ContactoEmpresasRepository;
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
 * REST controller for managing {@link com.beltran.gestionempleados.domain.ContactoEmpresas}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ContactoEmpresasResource {

    private final Logger log = LoggerFactory.getLogger(ContactoEmpresasResource.class);

    private static final String ENTITY_NAME = "contactoEmpresas";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContactoEmpresasRepository contactoEmpresasRepository;

    public ContactoEmpresasResource(ContactoEmpresasRepository contactoEmpresasRepository) {
        this.contactoEmpresasRepository = contactoEmpresasRepository;
    }

    /**
     * {@code POST  /contacto-empresas} : Create a new contactoEmpresas.
     *
     * @param contactoEmpresas the contactoEmpresas to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contactoEmpresas, or with status {@code 400 (Bad Request)} if the contactoEmpresas has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contacto-empresas")
    public ResponseEntity<ContactoEmpresas> createContactoEmpresas(@RequestBody ContactoEmpresas contactoEmpresas) throws URISyntaxException {
        log.debug("REST request to save ContactoEmpresas : {}", contactoEmpresas);
        if (contactoEmpresas.getId() != null) {
            throw new BadRequestAlertException("A new contactoEmpresas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContactoEmpresas result = contactoEmpresasRepository.save(contactoEmpresas);
        return ResponseEntity.created(new URI("/api/contacto-empresas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contacto-empresas} : Updates an existing contactoEmpresas.
     *
     * @param contactoEmpresas the contactoEmpresas to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contactoEmpresas,
     * or with status {@code 400 (Bad Request)} if the contactoEmpresas is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contactoEmpresas couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contacto-empresas")
    public ResponseEntity<ContactoEmpresas> updateContactoEmpresas(@RequestBody ContactoEmpresas contactoEmpresas) throws URISyntaxException {
        log.debug("REST request to update ContactoEmpresas : {}", contactoEmpresas);
        if (contactoEmpresas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContactoEmpresas result = contactoEmpresasRepository.save(contactoEmpresas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contactoEmpresas.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contacto-empresas} : get all the contactoEmpresas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contactoEmpresas in body.
     */
    @GetMapping("/contacto-empresas")
    public List<ContactoEmpresas> getAllContactoEmpresas() {
        log.debug("REST request to get all ContactoEmpresas");
        return contactoEmpresasRepository.findAll();
    }

    /**
     * {@code GET  /contacto-empresas/:id} : get the "id" contactoEmpresas.
     *
     * @param id the id of the contactoEmpresas to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contactoEmpresas, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contacto-empresas/{id}")
    public ResponseEntity<ContactoEmpresas> getContactoEmpresas(@PathVariable Long id) {
        log.debug("REST request to get ContactoEmpresas : {}", id);
        Optional<ContactoEmpresas> contactoEmpresas = contactoEmpresasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contactoEmpresas);
    }

    /**
     * {@code DELETE  /contacto-empresas/:id} : delete the "id" contactoEmpresas.
     *
     * @param id the id of the contactoEmpresas to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contacto-empresas/{id}")
    public ResponseEntity<Void> deleteContactoEmpresas(@PathVariable Long id) {
        log.debug("REST request to delete ContactoEmpresas : {}", id);
        contactoEmpresasRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
