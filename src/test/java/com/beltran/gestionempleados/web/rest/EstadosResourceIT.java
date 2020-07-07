package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Estados;
import com.beltran.gestionempleados.repository.EstadosRepository;

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
 * Integration tests for the {@link EstadosResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EstadosResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private EstadosRepository estadosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadosMockMvc;

    private Estados estados;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estados createEntity(EntityManager em) {
        Estados estados = new Estados()
            .nombre(DEFAULT_NOMBRE);
        return estados;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estados createUpdatedEntity(EntityManager em) {
        Estados estados = new Estados()
            .nombre(UPDATED_NOMBRE);
        return estados;
    }

    @BeforeEach
    public void initTest() {
        estados = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstados() throws Exception {
        int databaseSizeBeforeCreate = estadosRepository.findAll().size();
        // Create the Estados
        restEstadosMockMvc.perform(post("/api/estados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estados)))
            .andExpect(status().isCreated());

        // Validate the Estados in the database
        List<Estados> estadosList = estadosRepository.findAll();
        assertThat(estadosList).hasSize(databaseSizeBeforeCreate + 1);
        Estados testEstados = estadosList.get(estadosList.size() - 1);
        assertThat(testEstados.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createEstadosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadosRepository.findAll().size();

        // Create the Estados with an existing ID
        estados.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadosMockMvc.perform(post("/api/estados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estados)))
            .andExpect(status().isBadRequest());

        // Validate the Estados in the database
        List<Estados> estadosList = estadosRepository.findAll();
        assertThat(estadosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEstados() throws Exception {
        // Initialize the database
        estadosRepository.saveAndFlush(estados);

        // Get all the estadosList
        restEstadosMockMvc.perform(get("/api/estados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estados.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getEstados() throws Exception {
        // Initialize the database
        estadosRepository.saveAndFlush(estados);

        // Get the estados
        restEstadosMockMvc.perform(get("/api/estados/{id}", estados.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estados.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }
    @Test
    @Transactional
    public void getNonExistingEstados() throws Exception {
        // Get the estados
        restEstadosMockMvc.perform(get("/api/estados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstados() throws Exception {
        // Initialize the database
        estadosRepository.saveAndFlush(estados);

        int databaseSizeBeforeUpdate = estadosRepository.findAll().size();

        // Update the estados
        Estados updatedEstados = estadosRepository.findById(estados.getId()).get();
        // Disconnect from session so that the updates on updatedEstados are not directly saved in db
        em.detach(updatedEstados);
        updatedEstados
            .nombre(UPDATED_NOMBRE);

        restEstadosMockMvc.perform(put("/api/estados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstados)))
            .andExpect(status().isOk());

        // Validate the Estados in the database
        List<Estados> estadosList = estadosRepository.findAll();
        assertThat(estadosList).hasSize(databaseSizeBeforeUpdate);
        Estados testEstados = estadosList.get(estadosList.size() - 1);
        assertThat(testEstados.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingEstados() throws Exception {
        int databaseSizeBeforeUpdate = estadosRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadosMockMvc.perform(put("/api/estados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estados)))
            .andExpect(status().isBadRequest());

        // Validate the Estados in the database
        List<Estados> estadosList = estadosRepository.findAll();
        assertThat(estadosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstados() throws Exception {
        // Initialize the database
        estadosRepository.saveAndFlush(estados);

        int databaseSizeBeforeDelete = estadosRepository.findAll().size();

        // Delete the estados
        restEstadosMockMvc.perform(delete("/api/estados/{id}", estados.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Estados> estadosList = estadosRepository.findAll();
        assertThat(estadosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
