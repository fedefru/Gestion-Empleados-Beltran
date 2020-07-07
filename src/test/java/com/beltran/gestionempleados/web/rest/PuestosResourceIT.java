package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Puestos;
import com.beltran.gestionempleados.repository.PuestosRepository;

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
 * Integration tests for the {@link PuestosResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PuestosResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVO = false;
    private static final Boolean UPDATED_ACTIVO = true;

    @Autowired
    private PuestosRepository puestosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPuestosMockMvc;

    private Puestos puestos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Puestos createEntity(EntityManager em) {
        Puestos puestos = new Puestos()
            .nombre(DEFAULT_NOMBRE)
            .activo(DEFAULT_ACTIVO);
        return puestos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Puestos createUpdatedEntity(EntityManager em) {
        Puestos puestos = new Puestos()
            .nombre(UPDATED_NOMBRE)
            .activo(UPDATED_ACTIVO);
        return puestos;
    }

    @BeforeEach
    public void initTest() {
        puestos = createEntity(em);
    }

    @Test
    @Transactional
    public void createPuestos() throws Exception {
        int databaseSizeBeforeCreate = puestosRepository.findAll().size();
        // Create the Puestos
        restPuestosMockMvc.perform(post("/api/puestos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(puestos)))
            .andExpect(status().isCreated());

        // Validate the Puestos in the database
        List<Puestos> puestosList = puestosRepository.findAll();
        assertThat(puestosList).hasSize(databaseSizeBeforeCreate + 1);
        Puestos testPuestos = puestosList.get(puestosList.size() - 1);
        assertThat(testPuestos.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPuestos.isActivo()).isEqualTo(DEFAULT_ACTIVO);
    }

    @Test
    @Transactional
    public void createPuestosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = puestosRepository.findAll().size();

        // Create the Puestos with an existing ID
        puestos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPuestosMockMvc.perform(post("/api/puestos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(puestos)))
            .andExpect(status().isBadRequest());

        // Validate the Puestos in the database
        List<Puestos> puestosList = puestosRepository.findAll();
        assertThat(puestosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPuestos() throws Exception {
        // Initialize the database
        puestosRepository.saveAndFlush(puestos);

        // Get all the puestosList
        restPuestosMockMvc.perform(get("/api/puestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(puestos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].activo").value(hasItem(DEFAULT_ACTIVO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPuestos() throws Exception {
        // Initialize the database
        puestosRepository.saveAndFlush(puestos);

        // Get the puestos
        restPuestosMockMvc.perform(get("/api/puestos/{id}", puestos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(puestos.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.activo").value(DEFAULT_ACTIVO.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPuestos() throws Exception {
        // Get the puestos
        restPuestosMockMvc.perform(get("/api/puestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePuestos() throws Exception {
        // Initialize the database
        puestosRepository.saveAndFlush(puestos);

        int databaseSizeBeforeUpdate = puestosRepository.findAll().size();

        // Update the puestos
        Puestos updatedPuestos = puestosRepository.findById(puestos.getId()).get();
        // Disconnect from session so that the updates on updatedPuestos are not directly saved in db
        em.detach(updatedPuestos);
        updatedPuestos
            .nombre(UPDATED_NOMBRE)
            .activo(UPDATED_ACTIVO);

        restPuestosMockMvc.perform(put("/api/puestos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPuestos)))
            .andExpect(status().isOk());

        // Validate the Puestos in the database
        List<Puestos> puestosList = puestosRepository.findAll();
        assertThat(puestosList).hasSize(databaseSizeBeforeUpdate);
        Puestos testPuestos = puestosList.get(puestosList.size() - 1);
        assertThat(testPuestos.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPuestos.isActivo()).isEqualTo(UPDATED_ACTIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingPuestos() throws Exception {
        int databaseSizeBeforeUpdate = puestosRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPuestosMockMvc.perform(put("/api/puestos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(puestos)))
            .andExpect(status().isBadRequest());

        // Validate the Puestos in the database
        List<Puestos> puestosList = puestosRepository.findAll();
        assertThat(puestosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePuestos() throws Exception {
        // Initialize the database
        puestosRepository.saveAndFlush(puestos);

        int databaseSizeBeforeDelete = puestosRepository.findAll().size();

        // Delete the puestos
        restPuestosMockMvc.perform(delete("/api/puestos/{id}", puestos.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Puestos> puestosList = puestosRepository.findAll();
        assertThat(puestosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
