package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.ContactoUsuarios;
import com.beltran.gestionempleados.repository.ContactoUsuariosRepository;

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
 * Integration tests for the {@link ContactoUsuariosResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ContactoUsuariosResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private ContactoUsuariosRepository contactoUsuariosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContactoUsuariosMockMvc;

    private ContactoUsuarios contactoUsuarios;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContactoUsuarios createEntity(EntityManager em) {
        ContactoUsuarios contactoUsuarios = new ContactoUsuarios()
            .nombre(DEFAULT_NOMBRE);
        return contactoUsuarios;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContactoUsuarios createUpdatedEntity(EntityManager em) {
        ContactoUsuarios contactoUsuarios = new ContactoUsuarios()
            .nombre(UPDATED_NOMBRE);
        return contactoUsuarios;
    }

    @BeforeEach
    public void initTest() {
        contactoUsuarios = createEntity(em);
    }

    @Test
    @Transactional
    public void createContactoUsuarios() throws Exception {
        int databaseSizeBeforeCreate = contactoUsuariosRepository.findAll().size();
        // Create the ContactoUsuarios
        restContactoUsuariosMockMvc.perform(post("/api/contacto-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contactoUsuarios)))
            .andExpect(status().isCreated());

        // Validate the ContactoUsuarios in the database
        List<ContactoUsuarios> contactoUsuariosList = contactoUsuariosRepository.findAll();
        assertThat(contactoUsuariosList).hasSize(databaseSizeBeforeCreate + 1);
        ContactoUsuarios testContactoUsuarios = contactoUsuariosList.get(contactoUsuariosList.size() - 1);
        assertThat(testContactoUsuarios.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createContactoUsuariosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactoUsuariosRepository.findAll().size();

        // Create the ContactoUsuarios with an existing ID
        contactoUsuarios.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactoUsuariosMockMvc.perform(post("/api/contacto-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contactoUsuarios)))
            .andExpect(status().isBadRequest());

        // Validate the ContactoUsuarios in the database
        List<ContactoUsuarios> contactoUsuariosList = contactoUsuariosRepository.findAll();
        assertThat(contactoUsuariosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllContactoUsuarios() throws Exception {
        // Initialize the database
        contactoUsuariosRepository.saveAndFlush(contactoUsuarios);

        // Get all the contactoUsuariosList
        restContactoUsuariosMockMvc.perform(get("/api/contacto-usuarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactoUsuarios.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getContactoUsuarios() throws Exception {
        // Initialize the database
        contactoUsuariosRepository.saveAndFlush(contactoUsuarios);

        // Get the contactoUsuarios
        restContactoUsuariosMockMvc.perform(get("/api/contacto-usuarios/{id}", contactoUsuarios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contactoUsuarios.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }
    @Test
    @Transactional
    public void getNonExistingContactoUsuarios() throws Exception {
        // Get the contactoUsuarios
        restContactoUsuariosMockMvc.perform(get("/api/contacto-usuarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContactoUsuarios() throws Exception {
        // Initialize the database
        contactoUsuariosRepository.saveAndFlush(contactoUsuarios);

        int databaseSizeBeforeUpdate = contactoUsuariosRepository.findAll().size();

        // Update the contactoUsuarios
        ContactoUsuarios updatedContactoUsuarios = contactoUsuariosRepository.findById(contactoUsuarios.getId()).get();
        // Disconnect from session so that the updates on updatedContactoUsuarios are not directly saved in db
        em.detach(updatedContactoUsuarios);
        updatedContactoUsuarios
            .nombre(UPDATED_NOMBRE);

        restContactoUsuariosMockMvc.perform(put("/api/contacto-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedContactoUsuarios)))
            .andExpect(status().isOk());

        // Validate the ContactoUsuarios in the database
        List<ContactoUsuarios> contactoUsuariosList = contactoUsuariosRepository.findAll();
        assertThat(contactoUsuariosList).hasSize(databaseSizeBeforeUpdate);
        ContactoUsuarios testContactoUsuarios = contactoUsuariosList.get(contactoUsuariosList.size() - 1);
        assertThat(testContactoUsuarios.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingContactoUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = contactoUsuariosRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContactoUsuariosMockMvc.perform(put("/api/contacto-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contactoUsuarios)))
            .andExpect(status().isBadRequest());

        // Validate the ContactoUsuarios in the database
        List<ContactoUsuarios> contactoUsuariosList = contactoUsuariosRepository.findAll();
        assertThat(contactoUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContactoUsuarios() throws Exception {
        // Initialize the database
        contactoUsuariosRepository.saveAndFlush(contactoUsuarios);

        int databaseSizeBeforeDelete = contactoUsuariosRepository.findAll().size();

        // Delete the contactoUsuarios
        restContactoUsuariosMockMvc.perform(delete("/api/contacto-usuarios/{id}", contactoUsuarios.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ContactoUsuarios> contactoUsuariosList = contactoUsuariosRepository.findAll();
        assertThat(contactoUsuariosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
