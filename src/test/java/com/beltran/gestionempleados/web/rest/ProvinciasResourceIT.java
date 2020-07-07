package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Provincias;
import com.beltran.gestionempleados.repository.ProvinciasRepository;

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
 * Integration tests for the {@link ProvinciasResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProvinciasResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private ProvinciasRepository provinciasRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProvinciasMockMvc;

    private Provincias provincias;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Provincias createEntity(EntityManager em) {
        Provincias provincias = new Provincias()
            .nombre(DEFAULT_NOMBRE);
        return provincias;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Provincias createUpdatedEntity(EntityManager em) {
        Provincias provincias = new Provincias()
            .nombre(UPDATED_NOMBRE);
        return provincias;
    }

    @BeforeEach
    public void initTest() {
        provincias = createEntity(em);
    }

    @Test
    @Transactional
    public void createProvincias() throws Exception {
        int databaseSizeBeforeCreate = provinciasRepository.findAll().size();
        // Create the Provincias
        restProvinciasMockMvc.perform(post("/api/provincias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(provincias)))
            .andExpect(status().isCreated());

        // Validate the Provincias in the database
        List<Provincias> provinciasList = provinciasRepository.findAll();
        assertThat(provinciasList).hasSize(databaseSizeBeforeCreate + 1);
        Provincias testProvincias = provinciasList.get(provinciasList.size() - 1);
        assertThat(testProvincias.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createProvinciasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = provinciasRepository.findAll().size();

        // Create the Provincias with an existing ID
        provincias.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProvinciasMockMvc.perform(post("/api/provincias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(provincias)))
            .andExpect(status().isBadRequest());

        // Validate the Provincias in the database
        List<Provincias> provinciasList = provinciasRepository.findAll();
        assertThat(provinciasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProvincias() throws Exception {
        // Initialize the database
        provinciasRepository.saveAndFlush(provincias);

        // Get all the provinciasList
        restProvinciasMockMvc.perform(get("/api/provincias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(provincias.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getProvincias() throws Exception {
        // Initialize the database
        provinciasRepository.saveAndFlush(provincias);

        // Get the provincias
        restProvinciasMockMvc.perform(get("/api/provincias/{id}", provincias.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(provincias.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }
    @Test
    @Transactional
    public void getNonExistingProvincias() throws Exception {
        // Get the provincias
        restProvinciasMockMvc.perform(get("/api/provincias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProvincias() throws Exception {
        // Initialize the database
        provinciasRepository.saveAndFlush(provincias);

        int databaseSizeBeforeUpdate = provinciasRepository.findAll().size();

        // Update the provincias
        Provincias updatedProvincias = provinciasRepository.findById(provincias.getId()).get();
        // Disconnect from session so that the updates on updatedProvincias are not directly saved in db
        em.detach(updatedProvincias);
        updatedProvincias
            .nombre(UPDATED_NOMBRE);

        restProvinciasMockMvc.perform(put("/api/provincias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProvincias)))
            .andExpect(status().isOk());

        // Validate the Provincias in the database
        List<Provincias> provinciasList = provinciasRepository.findAll();
        assertThat(provinciasList).hasSize(databaseSizeBeforeUpdate);
        Provincias testProvincias = provinciasList.get(provinciasList.size() - 1);
        assertThat(testProvincias.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingProvincias() throws Exception {
        int databaseSizeBeforeUpdate = provinciasRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProvinciasMockMvc.perform(put("/api/provincias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(provincias)))
            .andExpect(status().isBadRequest());

        // Validate the Provincias in the database
        List<Provincias> provinciasList = provinciasRepository.findAll();
        assertThat(provinciasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProvincias() throws Exception {
        // Initialize the database
        provinciasRepository.saveAndFlush(provincias);

        int databaseSizeBeforeDelete = provinciasRepository.findAll().size();

        // Delete the provincias
        restProvinciasMockMvc.perform(delete("/api/provincias/{id}", provincias.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Provincias> provinciasList = provinciasRepository.findAll();
        assertThat(provinciasList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
