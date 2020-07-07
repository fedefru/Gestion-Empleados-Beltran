package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Entidades;
import com.beltran.gestionempleados.repository.EntidadesRepository;

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
 * Integration tests for the {@link EntidadesResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EntidadesResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_COMENTARIO = "AAAAAAAAAA";
    private static final String UPDATED_COMENTARIO = "BBBBBBBBBB";

    @Autowired
    private EntidadesRepository entidadesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEntidadesMockMvc;

    private Entidades entidades;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entidades createEntity(EntityManager em) {
        Entidades entidades = new Entidades()
            .nombre(DEFAULT_NOMBRE)
            .comentario(DEFAULT_COMENTARIO);
        return entidades;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entidades createUpdatedEntity(EntityManager em) {
        Entidades entidades = new Entidades()
            .nombre(UPDATED_NOMBRE)
            .comentario(UPDATED_COMENTARIO);
        return entidades;
    }

    @BeforeEach
    public void initTest() {
        entidades = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntidades() throws Exception {
        int databaseSizeBeforeCreate = entidadesRepository.findAll().size();
        // Create the Entidades
        restEntidadesMockMvc.perform(post("/api/entidades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entidades)))
            .andExpect(status().isCreated());

        // Validate the Entidades in the database
        List<Entidades> entidadesList = entidadesRepository.findAll();
        assertThat(entidadesList).hasSize(databaseSizeBeforeCreate + 1);
        Entidades testEntidades = entidadesList.get(entidadesList.size() - 1);
        assertThat(testEntidades.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEntidades.getComentario()).isEqualTo(DEFAULT_COMENTARIO);
    }

    @Test
    @Transactional
    public void createEntidadesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entidadesRepository.findAll().size();

        // Create the Entidades with an existing ID
        entidades.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntidadesMockMvc.perform(post("/api/entidades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entidades)))
            .andExpect(status().isBadRequest());

        // Validate the Entidades in the database
        List<Entidades> entidadesList = entidadesRepository.findAll();
        assertThat(entidadesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEntidades() throws Exception {
        // Initialize the database
        entidadesRepository.saveAndFlush(entidades);

        // Get all the entidadesList
        restEntidadesMockMvc.perform(get("/api/entidades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entidades.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].comentario").value(hasItem(DEFAULT_COMENTARIO)));
    }
    
    @Test
    @Transactional
    public void getEntidades() throws Exception {
        // Initialize the database
        entidadesRepository.saveAndFlush(entidades);

        // Get the entidades
        restEntidadesMockMvc.perform(get("/api/entidades/{id}", entidades.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entidades.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.comentario").value(DEFAULT_COMENTARIO));
    }
    @Test
    @Transactional
    public void getNonExistingEntidades() throws Exception {
        // Get the entidades
        restEntidadesMockMvc.perform(get("/api/entidades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntidades() throws Exception {
        // Initialize the database
        entidadesRepository.saveAndFlush(entidades);

        int databaseSizeBeforeUpdate = entidadesRepository.findAll().size();

        // Update the entidades
        Entidades updatedEntidades = entidadesRepository.findById(entidades.getId()).get();
        // Disconnect from session so that the updates on updatedEntidades are not directly saved in db
        em.detach(updatedEntidades);
        updatedEntidades
            .nombre(UPDATED_NOMBRE)
            .comentario(UPDATED_COMENTARIO);

        restEntidadesMockMvc.perform(put("/api/entidades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntidades)))
            .andExpect(status().isOk());

        // Validate the Entidades in the database
        List<Entidades> entidadesList = entidadesRepository.findAll();
        assertThat(entidadesList).hasSize(databaseSizeBeforeUpdate);
        Entidades testEntidades = entidadesList.get(entidadesList.size() - 1);
        assertThat(testEntidades.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEntidades.getComentario()).isEqualTo(UPDATED_COMENTARIO);
    }

    @Test
    @Transactional
    public void updateNonExistingEntidades() throws Exception {
        int databaseSizeBeforeUpdate = entidadesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntidadesMockMvc.perform(put("/api/entidades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entidades)))
            .andExpect(status().isBadRequest());

        // Validate the Entidades in the database
        List<Entidades> entidadesList = entidadesRepository.findAll();
        assertThat(entidadesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEntidades() throws Exception {
        // Initialize the database
        entidadesRepository.saveAndFlush(entidades);

        int databaseSizeBeforeDelete = entidadesRepository.findAll().size();

        // Delete the entidades
        restEntidadesMockMvc.perform(delete("/api/entidades/{id}", entidades.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Entidades> entidadesList = entidadesRepository.findAll();
        assertThat(entidadesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
