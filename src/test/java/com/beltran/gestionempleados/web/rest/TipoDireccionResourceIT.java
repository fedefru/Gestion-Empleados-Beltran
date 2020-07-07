package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.TipoDireccion;
import com.beltran.gestionempleados.repository.TipoDireccionRepository;

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
 * Integration tests for the {@link TipoDireccionResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoDireccionResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private TipoDireccionRepository tipoDireccionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoDireccionMockMvc;

    private TipoDireccion tipoDireccion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDireccion createEntity(EntityManager em) {
        TipoDireccion tipoDireccion = new TipoDireccion()
            .descripcion(DEFAULT_DESCRIPCION);
        return tipoDireccion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDireccion createUpdatedEntity(EntityManager em) {
        TipoDireccion tipoDireccion = new TipoDireccion()
            .descripcion(UPDATED_DESCRIPCION);
        return tipoDireccion;
    }

    @BeforeEach
    public void initTest() {
        tipoDireccion = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoDireccion() throws Exception {
        int databaseSizeBeforeCreate = tipoDireccionRepository.findAll().size();
        // Create the TipoDireccion
        restTipoDireccionMockMvc.perform(post("/api/tipo-direccions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDireccion)))
            .andExpect(status().isCreated());

        // Validate the TipoDireccion in the database
        List<TipoDireccion> tipoDireccionList = tipoDireccionRepository.findAll();
        assertThat(tipoDireccionList).hasSize(databaseSizeBeforeCreate + 1);
        TipoDireccion testTipoDireccion = tipoDireccionList.get(tipoDireccionList.size() - 1);
        assertThat(testTipoDireccion.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createTipoDireccionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoDireccionRepository.findAll().size();

        // Create the TipoDireccion with an existing ID
        tipoDireccion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoDireccionMockMvc.perform(post("/api/tipo-direccions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDireccion)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDireccion in the database
        List<TipoDireccion> tipoDireccionList = tipoDireccionRepository.findAll();
        assertThat(tipoDireccionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoDireccions() throws Exception {
        // Initialize the database
        tipoDireccionRepository.saveAndFlush(tipoDireccion);

        // Get all the tipoDireccionList
        restTipoDireccionMockMvc.perform(get("/api/tipo-direccions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoDireccion.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getTipoDireccion() throws Exception {
        // Initialize the database
        tipoDireccionRepository.saveAndFlush(tipoDireccion);

        // Get the tipoDireccion
        restTipoDireccionMockMvc.perform(get("/api/tipo-direccions/{id}", tipoDireccion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoDireccion.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }
    @Test
    @Transactional
    public void getNonExistingTipoDireccion() throws Exception {
        // Get the tipoDireccion
        restTipoDireccionMockMvc.perform(get("/api/tipo-direccions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoDireccion() throws Exception {
        // Initialize the database
        tipoDireccionRepository.saveAndFlush(tipoDireccion);

        int databaseSizeBeforeUpdate = tipoDireccionRepository.findAll().size();

        // Update the tipoDireccion
        TipoDireccion updatedTipoDireccion = tipoDireccionRepository.findById(tipoDireccion.getId()).get();
        // Disconnect from session so that the updates on updatedTipoDireccion are not directly saved in db
        em.detach(updatedTipoDireccion);
        updatedTipoDireccion
            .descripcion(UPDATED_DESCRIPCION);

        restTipoDireccionMockMvc.perform(put("/api/tipo-direccions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoDireccion)))
            .andExpect(status().isOk());

        // Validate the TipoDireccion in the database
        List<TipoDireccion> tipoDireccionList = tipoDireccionRepository.findAll();
        assertThat(tipoDireccionList).hasSize(databaseSizeBeforeUpdate);
        TipoDireccion testTipoDireccion = tipoDireccionList.get(tipoDireccionList.size() - 1);
        assertThat(testTipoDireccion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoDireccion() throws Exception {
        int databaseSizeBeforeUpdate = tipoDireccionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoDireccionMockMvc.perform(put("/api/tipo-direccions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDireccion)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDireccion in the database
        List<TipoDireccion> tipoDireccionList = tipoDireccionRepository.findAll();
        assertThat(tipoDireccionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoDireccion() throws Exception {
        // Initialize the database
        tipoDireccionRepository.saveAndFlush(tipoDireccion);

        int databaseSizeBeforeDelete = tipoDireccionRepository.findAll().size();

        // Delete the tipoDireccion
        restTipoDireccionMockMvc.perform(delete("/api/tipo-direccions/{id}", tipoDireccion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoDireccion> tipoDireccionList = tipoDireccionRepository.findAll();
        assertThat(tipoDireccionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
