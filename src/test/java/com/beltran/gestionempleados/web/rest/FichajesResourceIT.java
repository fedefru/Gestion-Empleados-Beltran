package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Fichajes;
import com.beltran.gestionempleados.repository.FichajesRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FichajesResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FichajesResourceIT {

    private static final LocalDate DEFAULT_FICHAJE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FICHAJE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ACCION = "AAAAAAAAAA";
    private static final String UPDATED_ACCION = "BBBBBBBBBB";

    @Autowired
    private FichajesRepository fichajesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFichajesMockMvc;

    private Fichajes fichajes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fichajes createEntity(EntityManager em) {
        Fichajes fichajes = new Fichajes()
            .fichaje(DEFAULT_FICHAJE)
            .accion(DEFAULT_ACCION);
        return fichajes;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fichajes createUpdatedEntity(EntityManager em) {
        Fichajes fichajes = new Fichajes()
            .fichaje(UPDATED_FICHAJE)
            .accion(UPDATED_ACCION);
        return fichajes;
    }

    @BeforeEach
    public void initTest() {
        fichajes = createEntity(em);
    }

    @Test
    @Transactional
    public void createFichajes() throws Exception {
        int databaseSizeBeforeCreate = fichajesRepository.findAll().size();
        // Create the Fichajes
        restFichajesMockMvc.perform(post("/api/fichajes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fichajes)))
            .andExpect(status().isCreated());

        // Validate the Fichajes in the database
        List<Fichajes> fichajesList = fichajesRepository.findAll();
        assertThat(fichajesList).hasSize(databaseSizeBeforeCreate + 1);
        Fichajes testFichajes = fichajesList.get(fichajesList.size() - 1);
        assertThat(testFichajes.getFichaje()).isEqualTo(DEFAULT_FICHAJE);
        assertThat(testFichajes.getAccion()).isEqualTo(DEFAULT_ACCION);
    }

    @Test
    @Transactional
    public void createFichajesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fichajesRepository.findAll().size();

        // Create the Fichajes with an existing ID
        fichajes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFichajesMockMvc.perform(post("/api/fichajes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fichajes)))
            .andExpect(status().isBadRequest());

        // Validate the Fichajes in the database
        List<Fichajes> fichajesList = fichajesRepository.findAll();
        assertThat(fichajesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFichajes() throws Exception {
        // Initialize the database
        fichajesRepository.saveAndFlush(fichajes);

        // Get all the fichajesList
        restFichajesMockMvc.perform(get("/api/fichajes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fichajes.getId().intValue())))
            .andExpect(jsonPath("$.[*].fichaje").value(hasItem(DEFAULT_FICHAJE.toString())))
            .andExpect(jsonPath("$.[*].accion").value(hasItem(DEFAULT_ACCION)));
    }
    
    @Test
    @Transactional
    public void getFichajes() throws Exception {
        // Initialize the database
        fichajesRepository.saveAndFlush(fichajes);

        // Get the fichajes
        restFichajesMockMvc.perform(get("/api/fichajes/{id}", fichajes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fichajes.getId().intValue()))
            .andExpect(jsonPath("$.fichaje").value(DEFAULT_FICHAJE.toString()))
            .andExpect(jsonPath("$.accion").value(DEFAULT_ACCION));
    }
    @Test
    @Transactional
    public void getNonExistingFichajes() throws Exception {
        // Get the fichajes
        restFichajesMockMvc.perform(get("/api/fichajes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFichajes() throws Exception {
        // Initialize the database
        fichajesRepository.saveAndFlush(fichajes);

        int databaseSizeBeforeUpdate = fichajesRepository.findAll().size();

        // Update the fichajes
        Fichajes updatedFichajes = fichajesRepository.findById(fichajes.getId()).get();
        // Disconnect from session so that the updates on updatedFichajes are not directly saved in db
        em.detach(updatedFichajes);
        updatedFichajes
            .fichaje(UPDATED_FICHAJE)
            .accion(UPDATED_ACCION);

        restFichajesMockMvc.perform(put("/api/fichajes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFichajes)))
            .andExpect(status().isOk());

        // Validate the Fichajes in the database
        List<Fichajes> fichajesList = fichajesRepository.findAll();
        assertThat(fichajesList).hasSize(databaseSizeBeforeUpdate);
        Fichajes testFichajes = fichajesList.get(fichajesList.size() - 1);
        assertThat(testFichajes.getFichaje()).isEqualTo(UPDATED_FICHAJE);
        assertThat(testFichajes.getAccion()).isEqualTo(UPDATED_ACCION);
    }

    @Test
    @Transactional
    public void updateNonExistingFichajes() throws Exception {
        int databaseSizeBeforeUpdate = fichajesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFichajesMockMvc.perform(put("/api/fichajes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fichajes)))
            .andExpect(status().isBadRequest());

        // Validate the Fichajes in the database
        List<Fichajes> fichajesList = fichajesRepository.findAll();
        assertThat(fichajesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFichajes() throws Exception {
        // Initialize the database
        fichajesRepository.saveAndFlush(fichajes);

        int databaseSizeBeforeDelete = fichajesRepository.findAll().size();

        // Delete the fichajes
        restFichajesMockMvc.perform(delete("/api/fichajes/{id}", fichajes.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Fichajes> fichajesList = fichajesRepository.findAll();
        assertThat(fichajesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
