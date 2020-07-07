package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.TipoDocumentos;
import com.beltran.gestionempleados.repository.TipoDocumentosRepository;

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
 * Integration tests for the {@link TipoDocumentosResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoDocumentosResourceIT {

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    @Autowired
    private TipoDocumentosRepository tipoDocumentosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoDocumentosMockMvc;

    private TipoDocumentos tipoDocumentos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDocumentos createEntity(EntityManager em) {
        TipoDocumentos tipoDocumentos = new TipoDocumentos()
            .tipo(DEFAULT_TIPO);
        return tipoDocumentos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDocumentos createUpdatedEntity(EntityManager em) {
        TipoDocumentos tipoDocumentos = new TipoDocumentos()
            .tipo(UPDATED_TIPO);
        return tipoDocumentos;
    }

    @BeforeEach
    public void initTest() {
        tipoDocumentos = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoDocumentos() throws Exception {
        int databaseSizeBeforeCreate = tipoDocumentosRepository.findAll().size();
        // Create the TipoDocumentos
        restTipoDocumentosMockMvc.perform(post("/api/tipo-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDocumentos)))
            .andExpect(status().isCreated());

        // Validate the TipoDocumentos in the database
        List<TipoDocumentos> tipoDocumentosList = tipoDocumentosRepository.findAll();
        assertThat(tipoDocumentosList).hasSize(databaseSizeBeforeCreate + 1);
        TipoDocumentos testTipoDocumentos = tipoDocumentosList.get(tipoDocumentosList.size() - 1);
        assertThat(testTipoDocumentos.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    public void createTipoDocumentosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoDocumentosRepository.findAll().size();

        // Create the TipoDocumentos with an existing ID
        tipoDocumentos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoDocumentosMockMvc.perform(post("/api/tipo-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDocumentos)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDocumentos in the database
        List<TipoDocumentos> tipoDocumentosList = tipoDocumentosRepository.findAll();
        assertThat(tipoDocumentosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoDocumentos() throws Exception {
        // Initialize the database
        tipoDocumentosRepository.saveAndFlush(tipoDocumentos);

        // Get all the tipoDocumentosList
        restTipoDocumentosMockMvc.perform(get("/api/tipo-documentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoDocumentos.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)));
    }
    
    @Test
    @Transactional
    public void getTipoDocumentos() throws Exception {
        // Initialize the database
        tipoDocumentosRepository.saveAndFlush(tipoDocumentos);

        // Get the tipoDocumentos
        restTipoDocumentosMockMvc.perform(get("/api/tipo-documentos/{id}", tipoDocumentos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoDocumentos.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO));
    }
    @Test
    @Transactional
    public void getNonExistingTipoDocumentos() throws Exception {
        // Get the tipoDocumentos
        restTipoDocumentosMockMvc.perform(get("/api/tipo-documentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoDocumentos() throws Exception {
        // Initialize the database
        tipoDocumentosRepository.saveAndFlush(tipoDocumentos);

        int databaseSizeBeforeUpdate = tipoDocumentosRepository.findAll().size();

        // Update the tipoDocumentos
        TipoDocumentos updatedTipoDocumentos = tipoDocumentosRepository.findById(tipoDocumentos.getId()).get();
        // Disconnect from session so that the updates on updatedTipoDocumentos are not directly saved in db
        em.detach(updatedTipoDocumentos);
        updatedTipoDocumentos
            .tipo(UPDATED_TIPO);

        restTipoDocumentosMockMvc.perform(put("/api/tipo-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoDocumentos)))
            .andExpect(status().isOk());

        // Validate the TipoDocumentos in the database
        List<TipoDocumentos> tipoDocumentosList = tipoDocumentosRepository.findAll();
        assertThat(tipoDocumentosList).hasSize(databaseSizeBeforeUpdate);
        TipoDocumentos testTipoDocumentos = tipoDocumentosList.get(tipoDocumentosList.size() - 1);
        assertThat(testTipoDocumentos.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoDocumentos() throws Exception {
        int databaseSizeBeforeUpdate = tipoDocumentosRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoDocumentosMockMvc.perform(put("/api/tipo-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDocumentos)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDocumentos in the database
        List<TipoDocumentos> tipoDocumentosList = tipoDocumentosRepository.findAll();
        assertThat(tipoDocumentosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoDocumentos() throws Exception {
        // Initialize the database
        tipoDocumentosRepository.saveAndFlush(tipoDocumentos);

        int databaseSizeBeforeDelete = tipoDocumentosRepository.findAll().size();

        // Delete the tipoDocumentos
        restTipoDocumentosMockMvc.perform(delete("/api/tipo-documentos/{id}", tipoDocumentos.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoDocumentos> tipoDocumentosList = tipoDocumentosRepository.findAll();
        assertThat(tipoDocumentosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
