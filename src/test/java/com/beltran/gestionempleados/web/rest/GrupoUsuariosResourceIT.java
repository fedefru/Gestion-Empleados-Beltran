package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.GrupoUsuarios;
import com.beltran.gestionempleados.repository.GrupoUsuariosRepository;

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
 * Integration tests for the {@link GrupoUsuariosResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class GrupoUsuariosResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private GrupoUsuariosRepository grupoUsuariosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGrupoUsuariosMockMvc;

    private GrupoUsuarios grupoUsuarios;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GrupoUsuarios createEntity(EntityManager em) {
        GrupoUsuarios grupoUsuarios = new GrupoUsuarios()
            .nombre(DEFAULT_NOMBRE);
        return grupoUsuarios;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GrupoUsuarios createUpdatedEntity(EntityManager em) {
        GrupoUsuarios grupoUsuarios = new GrupoUsuarios()
            .nombre(UPDATED_NOMBRE);
        return grupoUsuarios;
    }

    @BeforeEach
    public void initTest() {
        grupoUsuarios = createEntity(em);
    }

    @Test
    @Transactional
    public void createGrupoUsuarios() throws Exception {
        int databaseSizeBeforeCreate = grupoUsuariosRepository.findAll().size();
        // Create the GrupoUsuarios
        restGrupoUsuariosMockMvc.perform(post("/api/grupo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoUsuarios)))
            .andExpect(status().isCreated());

        // Validate the GrupoUsuarios in the database
        List<GrupoUsuarios> grupoUsuariosList = grupoUsuariosRepository.findAll();
        assertThat(grupoUsuariosList).hasSize(databaseSizeBeforeCreate + 1);
        GrupoUsuarios testGrupoUsuarios = grupoUsuariosList.get(grupoUsuariosList.size() - 1);
        assertThat(testGrupoUsuarios.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createGrupoUsuariosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = grupoUsuariosRepository.findAll().size();

        // Create the GrupoUsuarios with an existing ID
        grupoUsuarios.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGrupoUsuariosMockMvc.perform(post("/api/grupo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoUsuarios)))
            .andExpect(status().isBadRequest());

        // Validate the GrupoUsuarios in the database
        List<GrupoUsuarios> grupoUsuariosList = grupoUsuariosRepository.findAll();
        assertThat(grupoUsuariosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGrupoUsuarios() throws Exception {
        // Initialize the database
        grupoUsuariosRepository.saveAndFlush(grupoUsuarios);

        // Get all the grupoUsuariosList
        restGrupoUsuariosMockMvc.perform(get("/api/grupo-usuarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grupoUsuarios.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getGrupoUsuarios() throws Exception {
        // Initialize the database
        grupoUsuariosRepository.saveAndFlush(grupoUsuarios);

        // Get the grupoUsuarios
        restGrupoUsuariosMockMvc.perform(get("/api/grupo-usuarios/{id}", grupoUsuarios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(grupoUsuarios.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }
    @Test
    @Transactional
    public void getNonExistingGrupoUsuarios() throws Exception {
        // Get the grupoUsuarios
        restGrupoUsuariosMockMvc.perform(get("/api/grupo-usuarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGrupoUsuarios() throws Exception {
        // Initialize the database
        grupoUsuariosRepository.saveAndFlush(grupoUsuarios);

        int databaseSizeBeforeUpdate = grupoUsuariosRepository.findAll().size();

        // Update the grupoUsuarios
        GrupoUsuarios updatedGrupoUsuarios = grupoUsuariosRepository.findById(grupoUsuarios.getId()).get();
        // Disconnect from session so that the updates on updatedGrupoUsuarios are not directly saved in db
        em.detach(updatedGrupoUsuarios);
        updatedGrupoUsuarios
            .nombre(UPDATED_NOMBRE);

        restGrupoUsuariosMockMvc.perform(put("/api/grupo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGrupoUsuarios)))
            .andExpect(status().isOk());

        // Validate the GrupoUsuarios in the database
        List<GrupoUsuarios> grupoUsuariosList = grupoUsuariosRepository.findAll();
        assertThat(grupoUsuariosList).hasSize(databaseSizeBeforeUpdate);
        GrupoUsuarios testGrupoUsuarios = grupoUsuariosList.get(grupoUsuariosList.size() - 1);
        assertThat(testGrupoUsuarios.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingGrupoUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = grupoUsuariosRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGrupoUsuariosMockMvc.perform(put("/api/grupo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoUsuarios)))
            .andExpect(status().isBadRequest());

        // Validate the GrupoUsuarios in the database
        List<GrupoUsuarios> grupoUsuariosList = grupoUsuariosRepository.findAll();
        assertThat(grupoUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGrupoUsuarios() throws Exception {
        // Initialize the database
        grupoUsuariosRepository.saveAndFlush(grupoUsuarios);

        int databaseSizeBeforeDelete = grupoUsuariosRepository.findAll().size();

        // Delete the grupoUsuarios
        restGrupoUsuariosMockMvc.perform(delete("/api/grupo-usuarios/{id}", grupoUsuarios.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GrupoUsuarios> grupoUsuariosList = grupoUsuariosRepository.findAll();
        assertThat(grupoUsuariosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
