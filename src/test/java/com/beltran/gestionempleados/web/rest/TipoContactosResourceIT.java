package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.TipoContactos;
import com.beltran.gestionempleados.repository.TipoContactosRepository;

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
 * Integration tests for the {@link TipoContactosResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoContactosResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private TipoContactosRepository tipoContactosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoContactosMockMvc;

    private TipoContactos tipoContactos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoContactos createEntity(EntityManager em) {
        TipoContactos tipoContactos = new TipoContactos()
            .descripcion(DEFAULT_DESCRIPCION);
        return tipoContactos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoContactos createUpdatedEntity(EntityManager em) {
        TipoContactos tipoContactos = new TipoContactos()
            .descripcion(UPDATED_DESCRIPCION);
        return tipoContactos;
    }

    @BeforeEach
    public void initTest() {
        tipoContactos = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoContactos() throws Exception {
        int databaseSizeBeforeCreate = tipoContactosRepository.findAll().size();
        // Create the TipoContactos
        restTipoContactosMockMvc.perform(post("/api/tipo-contactos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoContactos)))
            .andExpect(status().isCreated());

        // Validate the TipoContactos in the database
        List<TipoContactos> tipoContactosList = tipoContactosRepository.findAll();
        assertThat(tipoContactosList).hasSize(databaseSizeBeforeCreate + 1);
        TipoContactos testTipoContactos = tipoContactosList.get(tipoContactosList.size() - 1);
        assertThat(testTipoContactos.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createTipoContactosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoContactosRepository.findAll().size();

        // Create the TipoContactos with an existing ID
        tipoContactos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoContactosMockMvc.perform(post("/api/tipo-contactos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoContactos)))
            .andExpect(status().isBadRequest());

        // Validate the TipoContactos in the database
        List<TipoContactos> tipoContactosList = tipoContactosRepository.findAll();
        assertThat(tipoContactosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoContactos() throws Exception {
        // Initialize the database
        tipoContactosRepository.saveAndFlush(tipoContactos);

        // Get all the tipoContactosList
        restTipoContactosMockMvc.perform(get("/api/tipo-contactos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoContactos.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getTipoContactos() throws Exception {
        // Initialize the database
        tipoContactosRepository.saveAndFlush(tipoContactos);

        // Get the tipoContactos
        restTipoContactosMockMvc.perform(get("/api/tipo-contactos/{id}", tipoContactos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoContactos.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }
    @Test
    @Transactional
    public void getNonExistingTipoContactos() throws Exception {
        // Get the tipoContactos
        restTipoContactosMockMvc.perform(get("/api/tipo-contactos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoContactos() throws Exception {
        // Initialize the database
        tipoContactosRepository.saveAndFlush(tipoContactos);

        int databaseSizeBeforeUpdate = tipoContactosRepository.findAll().size();

        // Update the tipoContactos
        TipoContactos updatedTipoContactos = tipoContactosRepository.findById(tipoContactos.getId()).get();
        // Disconnect from session so that the updates on updatedTipoContactos are not directly saved in db
        em.detach(updatedTipoContactos);
        updatedTipoContactos
            .descripcion(UPDATED_DESCRIPCION);

        restTipoContactosMockMvc.perform(put("/api/tipo-contactos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoContactos)))
            .andExpect(status().isOk());

        // Validate the TipoContactos in the database
        List<TipoContactos> tipoContactosList = tipoContactosRepository.findAll();
        assertThat(tipoContactosList).hasSize(databaseSizeBeforeUpdate);
        TipoContactos testTipoContactos = tipoContactosList.get(tipoContactosList.size() - 1);
        assertThat(testTipoContactos.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoContactos() throws Exception {
        int databaseSizeBeforeUpdate = tipoContactosRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoContactosMockMvc.perform(put("/api/tipo-contactos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoContactos)))
            .andExpect(status().isBadRequest());

        // Validate the TipoContactos in the database
        List<TipoContactos> tipoContactosList = tipoContactosRepository.findAll();
        assertThat(tipoContactosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoContactos() throws Exception {
        // Initialize the database
        tipoContactosRepository.saveAndFlush(tipoContactos);

        int databaseSizeBeforeDelete = tipoContactosRepository.findAll().size();

        // Delete the tipoContactos
        restTipoContactosMockMvc.perform(delete("/api/tipo-contactos/{id}", tipoContactos.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoContactos> tipoContactosList = tipoContactosRepository.findAll();
        assertThat(tipoContactosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
