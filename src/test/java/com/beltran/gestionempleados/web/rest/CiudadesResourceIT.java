package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Ciudades;
import com.beltran.gestionempleados.repository.CiudadesRepository;

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
 * Integration tests for the {@link CiudadesResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CiudadesResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private CiudadesRepository ciudadesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCiudadesMockMvc;

    private Ciudades ciudades;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ciudades createEntity(EntityManager em) {
        Ciudades ciudades = new Ciudades()
            .nombre(DEFAULT_NOMBRE);
        return ciudades;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ciudades createUpdatedEntity(EntityManager em) {
        Ciudades ciudades = new Ciudades()
            .nombre(UPDATED_NOMBRE);
        return ciudades;
    }

    @BeforeEach
    public void initTest() {
        ciudades = createEntity(em);
    }

    @Test
    @Transactional
    public void createCiudades() throws Exception {
        int databaseSizeBeforeCreate = ciudadesRepository.findAll().size();
        // Create the Ciudades
        restCiudadesMockMvc.perform(post("/api/ciudades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ciudades)))
            .andExpect(status().isCreated());

        // Validate the Ciudades in the database
        List<Ciudades> ciudadesList = ciudadesRepository.findAll();
        assertThat(ciudadesList).hasSize(databaseSizeBeforeCreate + 1);
        Ciudades testCiudades = ciudadesList.get(ciudadesList.size() - 1);
        assertThat(testCiudades.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createCiudadesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ciudadesRepository.findAll().size();

        // Create the Ciudades with an existing ID
        ciudades.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCiudadesMockMvc.perform(post("/api/ciudades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ciudades)))
            .andExpect(status().isBadRequest());

        // Validate the Ciudades in the database
        List<Ciudades> ciudadesList = ciudadesRepository.findAll();
        assertThat(ciudadesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCiudades() throws Exception {
        // Initialize the database
        ciudadesRepository.saveAndFlush(ciudades);

        // Get all the ciudadesList
        restCiudadesMockMvc.perform(get("/api/ciudades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ciudades.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getCiudades() throws Exception {
        // Initialize the database
        ciudadesRepository.saveAndFlush(ciudades);

        // Get the ciudades
        restCiudadesMockMvc.perform(get("/api/ciudades/{id}", ciudades.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ciudades.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }
    @Test
    @Transactional
    public void getNonExistingCiudades() throws Exception {
        // Get the ciudades
        restCiudadesMockMvc.perform(get("/api/ciudades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCiudades() throws Exception {
        // Initialize the database
        ciudadesRepository.saveAndFlush(ciudades);

        int databaseSizeBeforeUpdate = ciudadesRepository.findAll().size();

        // Update the ciudades
        Ciudades updatedCiudades = ciudadesRepository.findById(ciudades.getId()).get();
        // Disconnect from session so that the updates on updatedCiudades are not directly saved in db
        em.detach(updatedCiudades);
        updatedCiudades
            .nombre(UPDATED_NOMBRE);

        restCiudadesMockMvc.perform(put("/api/ciudades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCiudades)))
            .andExpect(status().isOk());

        // Validate the Ciudades in the database
        List<Ciudades> ciudadesList = ciudadesRepository.findAll();
        assertThat(ciudadesList).hasSize(databaseSizeBeforeUpdate);
        Ciudades testCiudades = ciudadesList.get(ciudadesList.size() - 1);
        assertThat(testCiudades.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingCiudades() throws Exception {
        int databaseSizeBeforeUpdate = ciudadesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCiudadesMockMvc.perform(put("/api/ciudades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ciudades)))
            .andExpect(status().isBadRequest());

        // Validate the Ciudades in the database
        List<Ciudades> ciudadesList = ciudadesRepository.findAll();
        assertThat(ciudadesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCiudades() throws Exception {
        // Initialize the database
        ciudadesRepository.saveAndFlush(ciudades);

        int databaseSizeBeforeDelete = ciudadesRepository.findAll().size();

        // Delete the ciudades
        restCiudadesMockMvc.perform(delete("/api/ciudades/{id}", ciudades.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ciudades> ciudadesList = ciudadesRepository.findAll();
        assertThat(ciudadesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
