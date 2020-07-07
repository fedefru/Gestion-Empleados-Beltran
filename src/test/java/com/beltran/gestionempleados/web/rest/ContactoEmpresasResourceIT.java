package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.ContactoEmpresas;
import com.beltran.gestionempleados.repository.ContactoEmpresasRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ContactoEmpresasResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ContactoEmpresasResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private ContactoEmpresasRepository contactoEmpresasRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContactoEmpresasMockMvc;

    private ContactoEmpresas contactoEmpresas;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContactoEmpresas createEntity(EntityManager em) {
        ContactoEmpresas contactoEmpresas = new ContactoEmpresas()
            .nombre(DEFAULT_NOMBRE);
        return contactoEmpresas;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContactoEmpresas createUpdatedEntity(EntityManager em) {
        ContactoEmpresas contactoEmpresas = new ContactoEmpresas()
            .nombre(UPDATED_NOMBRE);
        return contactoEmpresas;
    }

    @BeforeEach
    public void initTest() {
        contactoEmpresas = createEntity(em);
    }

    @Test
    @Transactional
    public void createContactoEmpresas() throws Exception {
        int databaseSizeBeforeCreate = contactoEmpresasRepository.findAll().size();
        // Create the ContactoEmpresas
        restContactoEmpresasMockMvc.perform(post("/api/contacto-empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contactoEmpresas)))
            .andExpect(status().isCreated());

        // Validate the ContactoEmpresas in the database
        List<ContactoEmpresas> contactoEmpresasList = contactoEmpresasRepository.findAll();
        assertThat(contactoEmpresasList).hasSize(databaseSizeBeforeCreate + 1);
        ContactoEmpresas testContactoEmpresas = contactoEmpresasList.get(contactoEmpresasList.size() - 1);
        assertThat(testContactoEmpresas.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createContactoEmpresasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactoEmpresasRepository.findAll().size();

        // Create the ContactoEmpresas with an existing ID
        contactoEmpresas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactoEmpresasMockMvc.perform(post("/api/contacto-empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contactoEmpresas)))
            .andExpect(status().isBadRequest());

        // Validate the ContactoEmpresas in the database
        List<ContactoEmpresas> contactoEmpresasList = contactoEmpresasRepository.findAll();
        assertThat(contactoEmpresasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllContactoEmpresas() throws Exception {
        // Initialize the database
        contactoEmpresasRepository.saveAndFlush(contactoEmpresas);

        // Get all the contactoEmpresasList
        restContactoEmpresasMockMvc.perform(get("/api/contacto-empresas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactoEmpresas.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getContactoEmpresas() throws Exception {
        // Initialize the database
        contactoEmpresasRepository.saveAndFlush(contactoEmpresas);

        // Get the contactoEmpresas
        restContactoEmpresasMockMvc.perform(get("/api/contacto-empresas/{id}", contactoEmpresas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contactoEmpresas.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }
    @Test
    @Transactional
    public void getNonExistingContactoEmpresas() throws Exception {
        // Get the contactoEmpresas
        restContactoEmpresasMockMvc.perform(get("/api/contacto-empresas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContactoEmpresas() throws Exception {
        // Initialize the database
        contactoEmpresasRepository.saveAndFlush(contactoEmpresas);

        int databaseSizeBeforeUpdate = contactoEmpresasRepository.findAll().size();

        // Update the contactoEmpresas
        ContactoEmpresas updatedContactoEmpresas = contactoEmpresasRepository.findById(contactoEmpresas.getId()).get();
        // Disconnect from session so that the updates on updatedContactoEmpresas are not directly saved in db
        em.detach(updatedContactoEmpresas);
        updatedContactoEmpresas
            .nombre(UPDATED_NOMBRE);

        restContactoEmpresasMockMvc.perform(put("/api/contacto-empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedContactoEmpresas)))
            .andExpect(status().isOk());

        // Validate the ContactoEmpresas in the database
        List<ContactoEmpresas> contactoEmpresasList = contactoEmpresasRepository.findAll();
        assertThat(contactoEmpresasList).hasSize(databaseSizeBeforeUpdate);
        ContactoEmpresas testContactoEmpresas = contactoEmpresasList.get(contactoEmpresasList.size() - 1);
        assertThat(testContactoEmpresas.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingContactoEmpresas() throws Exception {
        int databaseSizeBeforeUpdate = contactoEmpresasRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContactoEmpresasMockMvc.perform(put("/api/contacto-empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contactoEmpresas)))
            .andExpect(status().isBadRequest());

        // Validate the ContactoEmpresas in the database
        List<ContactoEmpresas> contactoEmpresasList = contactoEmpresasRepository.findAll();
        assertThat(contactoEmpresasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContactoEmpresas() throws Exception {
        // Initialize the database
        contactoEmpresasRepository.saveAndFlush(contactoEmpresas);

        int databaseSizeBeforeDelete = contactoEmpresasRepository.findAll().size();

        // Delete the contactoEmpresas
        restContactoEmpresasMockMvc.perform(delete("/api/contacto-empresas/{id}", contactoEmpresas.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ContactoEmpresas> contactoEmpresasList = contactoEmpresasRepository.findAll();
        assertThat(contactoEmpresasList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
