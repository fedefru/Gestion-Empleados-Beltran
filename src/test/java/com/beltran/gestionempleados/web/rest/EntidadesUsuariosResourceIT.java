package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.EntidadesUsuarios;
import com.beltran.gestionempleados.repository.EntidadesUsuariosRepository;

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
 * Integration tests for the {@link EntidadesUsuariosResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EntidadesUsuariosResourceIT {

    private static final String DEFAULT_VALOR = "AAAAAAAAAA";
    private static final String UPDATED_VALOR = "BBBBBBBBBB";

    @Autowired
    private EntidadesUsuariosRepository entidadesUsuariosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEntidadesUsuariosMockMvc;

    private EntidadesUsuarios entidadesUsuarios;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntidadesUsuarios createEntity(EntityManager em) {
        EntidadesUsuarios entidadesUsuarios = new EntidadesUsuarios()
            .valor(DEFAULT_VALOR);
        return entidadesUsuarios;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntidadesUsuarios createUpdatedEntity(EntityManager em) {
        EntidadesUsuarios entidadesUsuarios = new EntidadesUsuarios()
            .valor(UPDATED_VALOR);
        return entidadesUsuarios;
    }

    @BeforeEach
    public void initTest() {
        entidadesUsuarios = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntidadesUsuarios() throws Exception {
        int databaseSizeBeforeCreate = entidadesUsuariosRepository.findAll().size();
        // Create the EntidadesUsuarios
        restEntidadesUsuariosMockMvc.perform(post("/api/entidades-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entidadesUsuarios)))
            .andExpect(status().isCreated());

        // Validate the EntidadesUsuarios in the database
        List<EntidadesUsuarios> entidadesUsuariosList = entidadesUsuariosRepository.findAll();
        assertThat(entidadesUsuariosList).hasSize(databaseSizeBeforeCreate + 1);
        EntidadesUsuarios testEntidadesUsuarios = entidadesUsuariosList.get(entidadesUsuariosList.size() - 1);
        assertThat(testEntidadesUsuarios.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    public void createEntidadesUsuariosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entidadesUsuariosRepository.findAll().size();

        // Create the EntidadesUsuarios with an existing ID
        entidadesUsuarios.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntidadesUsuariosMockMvc.perform(post("/api/entidades-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entidadesUsuarios)))
            .andExpect(status().isBadRequest());

        // Validate the EntidadesUsuarios in the database
        List<EntidadesUsuarios> entidadesUsuariosList = entidadesUsuariosRepository.findAll();
        assertThat(entidadesUsuariosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEntidadesUsuarios() throws Exception {
        // Initialize the database
        entidadesUsuariosRepository.saveAndFlush(entidadesUsuarios);

        // Get all the entidadesUsuariosList
        restEntidadesUsuariosMockMvc.perform(get("/api/entidades-usuarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entidadesUsuarios.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)));
    }
    
    @Test
    @Transactional
    public void getEntidadesUsuarios() throws Exception {
        // Initialize the database
        entidadesUsuariosRepository.saveAndFlush(entidadesUsuarios);

        // Get the entidadesUsuarios
        restEntidadesUsuariosMockMvc.perform(get("/api/entidades-usuarios/{id}", entidadesUsuarios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entidadesUsuarios.getId().intValue()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR));
    }
    @Test
    @Transactional
    public void getNonExistingEntidadesUsuarios() throws Exception {
        // Get the entidadesUsuarios
        restEntidadesUsuariosMockMvc.perform(get("/api/entidades-usuarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntidadesUsuarios() throws Exception {
        // Initialize the database
        entidadesUsuariosRepository.saveAndFlush(entidadesUsuarios);

        int databaseSizeBeforeUpdate = entidadesUsuariosRepository.findAll().size();

        // Update the entidadesUsuarios
        EntidadesUsuarios updatedEntidadesUsuarios = entidadesUsuariosRepository.findById(entidadesUsuarios.getId()).get();
        // Disconnect from session so that the updates on updatedEntidadesUsuarios are not directly saved in db
        em.detach(updatedEntidadesUsuarios);
        updatedEntidadesUsuarios
            .valor(UPDATED_VALOR);

        restEntidadesUsuariosMockMvc.perform(put("/api/entidades-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntidadesUsuarios)))
            .andExpect(status().isOk());

        // Validate the EntidadesUsuarios in the database
        List<EntidadesUsuarios> entidadesUsuariosList = entidadesUsuariosRepository.findAll();
        assertThat(entidadesUsuariosList).hasSize(databaseSizeBeforeUpdate);
        EntidadesUsuarios testEntidadesUsuarios = entidadesUsuariosList.get(entidadesUsuariosList.size() - 1);
        assertThat(testEntidadesUsuarios.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void updateNonExistingEntidadesUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = entidadesUsuariosRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntidadesUsuariosMockMvc.perform(put("/api/entidades-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entidadesUsuarios)))
            .andExpect(status().isBadRequest());

        // Validate the EntidadesUsuarios in the database
        List<EntidadesUsuarios> entidadesUsuariosList = entidadesUsuariosRepository.findAll();
        assertThat(entidadesUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEntidadesUsuarios() throws Exception {
        // Initialize the database
        entidadesUsuariosRepository.saveAndFlush(entidadesUsuarios);

        int databaseSizeBeforeDelete = entidadesUsuariosRepository.findAll().size();

        // Delete the entidadesUsuarios
        restEntidadesUsuariosMockMvc.perform(delete("/api/entidades-usuarios/{id}", entidadesUsuarios.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EntidadesUsuarios> entidadesUsuariosList = entidadesUsuariosRepository.findAll();
        assertThat(entidadesUsuariosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
