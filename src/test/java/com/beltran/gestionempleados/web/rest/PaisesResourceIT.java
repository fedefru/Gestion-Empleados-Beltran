package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Paises;
import com.beltran.gestionempleados.repository.PaisesRepository;

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
 * Integration tests for the {@link PaisesResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PaisesResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private PaisesRepository paisesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPaisesMockMvc;

    private Paises paises;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paises createEntity(EntityManager em) {
        Paises paises = new Paises()
            .nombre(DEFAULT_NOMBRE);
        return paises;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paises createUpdatedEntity(EntityManager em) {
        Paises paises = new Paises()
            .nombre(UPDATED_NOMBRE);
        return paises;
    }

    @BeforeEach
    public void initTest() {
        paises = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaises() throws Exception {
        int databaseSizeBeforeCreate = paisesRepository.findAll().size();
        // Create the Paises
        restPaisesMockMvc.perform(post("/api/paises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paises)))
            .andExpect(status().isCreated());

        // Validate the Paises in the database
        List<Paises> paisesList = paisesRepository.findAll();
        assertThat(paisesList).hasSize(databaseSizeBeforeCreate + 1);
        Paises testPaises = paisesList.get(paisesList.size() - 1);
        assertThat(testPaises.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createPaisesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paisesRepository.findAll().size();

        // Create the Paises with an existing ID
        paises.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaisesMockMvc.perform(post("/api/paises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paises)))
            .andExpect(status().isBadRequest());

        // Validate the Paises in the database
        List<Paises> paisesList = paisesRepository.findAll();
        assertThat(paisesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPaises() throws Exception {
        // Initialize the database
        paisesRepository.saveAndFlush(paises);

        // Get all the paisesList
        restPaisesMockMvc.perform(get("/api/paises?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paises.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getPaises() throws Exception {
        // Initialize the database
        paisesRepository.saveAndFlush(paises);

        // Get the paises
        restPaisesMockMvc.perform(get("/api/paises/{id}", paises.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(paises.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }
    @Test
    @Transactional
    public void getNonExistingPaises() throws Exception {
        // Get the paises
        restPaisesMockMvc.perform(get("/api/paises/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaises() throws Exception {
        // Initialize the database
        paisesRepository.saveAndFlush(paises);

        int databaseSizeBeforeUpdate = paisesRepository.findAll().size();

        // Update the paises
        Paises updatedPaises = paisesRepository.findById(paises.getId()).get();
        // Disconnect from session so that the updates on updatedPaises are not directly saved in db
        em.detach(updatedPaises);
        updatedPaises
            .nombre(UPDATED_NOMBRE);

        restPaisesMockMvc.perform(put("/api/paises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPaises)))
            .andExpect(status().isOk());

        // Validate the Paises in the database
        List<Paises> paisesList = paisesRepository.findAll();
        assertThat(paisesList).hasSize(databaseSizeBeforeUpdate);
        Paises testPaises = paisesList.get(paisesList.size() - 1);
        assertThat(testPaises.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingPaises() throws Exception {
        int databaseSizeBeforeUpdate = paisesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaisesMockMvc.perform(put("/api/paises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paises)))
            .andExpect(status().isBadRequest());

        // Validate the Paises in the database
        List<Paises> paisesList = paisesRepository.findAll();
        assertThat(paisesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePaises() throws Exception {
        // Initialize the database
        paisesRepository.saveAndFlush(paises);

        int databaseSizeBeforeDelete = paisesRepository.findAll().size();

        // Delete the paises
        restPaisesMockMvc.perform(delete("/api/paises/{id}", paises.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Paises> paisesList = paisesRepository.findAll();
        assertThat(paisesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
