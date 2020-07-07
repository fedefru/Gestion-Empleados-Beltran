package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Configuraciones;
import com.beltran.gestionempleados.repository.ConfiguracionesRepository;

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
 * Integration tests for the {@link ConfiguracionesResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ConfiguracionesResourceIT {

    private static final String DEFAULT_CLAVE = "AAAAAAAAAA";
    private static final String UPDATED_CLAVE = "BBBBBBBBBB";

    private static final String DEFAULT_VALOR = "AAAAAAAAAA";
    private static final String UPDATED_VALOR = "BBBBBBBBBB";

    private static final String DEFAULT_DETALLE = "AAAAAAAAAA";
    private static final String UPDATED_DETALLE = "BBBBBBBBBB";

    @Autowired
    private ConfiguracionesRepository configuracionesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConfiguracionesMockMvc;

    private Configuraciones configuraciones;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Configuraciones createEntity(EntityManager em) {
        Configuraciones configuraciones = new Configuraciones()
            .clave(DEFAULT_CLAVE)
            .valor(DEFAULT_VALOR)
            .detalle(DEFAULT_DETALLE);
        return configuraciones;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Configuraciones createUpdatedEntity(EntityManager em) {
        Configuraciones configuraciones = new Configuraciones()
            .clave(UPDATED_CLAVE)
            .valor(UPDATED_VALOR)
            .detalle(UPDATED_DETALLE);
        return configuraciones;
    }

    @BeforeEach
    public void initTest() {
        configuraciones = createEntity(em);
    }

    @Test
    @Transactional
    public void createConfiguraciones() throws Exception {
        int databaseSizeBeforeCreate = configuracionesRepository.findAll().size();
        // Create the Configuraciones
        restConfiguracionesMockMvc.perform(post("/api/configuraciones")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(configuraciones)))
            .andExpect(status().isCreated());

        // Validate the Configuraciones in the database
        List<Configuraciones> configuracionesList = configuracionesRepository.findAll();
        assertThat(configuracionesList).hasSize(databaseSizeBeforeCreate + 1);
        Configuraciones testConfiguraciones = configuracionesList.get(configuracionesList.size() - 1);
        assertThat(testConfiguraciones.getClave()).isEqualTo(DEFAULT_CLAVE);
        assertThat(testConfiguraciones.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testConfiguraciones.getDetalle()).isEqualTo(DEFAULT_DETALLE);
    }

    @Test
    @Transactional
    public void createConfiguracionesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = configuracionesRepository.findAll().size();

        // Create the Configuraciones with an existing ID
        configuraciones.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConfiguracionesMockMvc.perform(post("/api/configuraciones")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(configuraciones)))
            .andExpect(status().isBadRequest());

        // Validate the Configuraciones in the database
        List<Configuraciones> configuracionesList = configuracionesRepository.findAll();
        assertThat(configuracionesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllConfiguraciones() throws Exception {
        // Initialize the database
        configuracionesRepository.saveAndFlush(configuraciones);

        // Get all the configuracionesList
        restConfiguracionesMockMvc.perform(get("/api/configuraciones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(configuraciones.getId().intValue())))
            .andExpect(jsonPath("$.[*].clave").value(hasItem(DEFAULT_CLAVE)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)))
            .andExpect(jsonPath("$.[*].detalle").value(hasItem(DEFAULT_DETALLE)));
    }
    
    @Test
    @Transactional
    public void getConfiguraciones() throws Exception {
        // Initialize the database
        configuracionesRepository.saveAndFlush(configuraciones);

        // Get the configuraciones
        restConfiguracionesMockMvc.perform(get("/api/configuraciones/{id}", configuraciones.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(configuraciones.getId().intValue()))
            .andExpect(jsonPath("$.clave").value(DEFAULT_CLAVE))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR))
            .andExpect(jsonPath("$.detalle").value(DEFAULT_DETALLE));
    }
    @Test
    @Transactional
    public void getNonExistingConfiguraciones() throws Exception {
        // Get the configuraciones
        restConfiguracionesMockMvc.perform(get("/api/configuraciones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConfiguraciones() throws Exception {
        // Initialize the database
        configuracionesRepository.saveAndFlush(configuraciones);

        int databaseSizeBeforeUpdate = configuracionesRepository.findAll().size();

        // Update the configuraciones
        Configuraciones updatedConfiguraciones = configuracionesRepository.findById(configuraciones.getId()).get();
        // Disconnect from session so that the updates on updatedConfiguraciones are not directly saved in db
        em.detach(updatedConfiguraciones);
        updatedConfiguraciones
            .clave(UPDATED_CLAVE)
            .valor(UPDATED_VALOR)
            .detalle(UPDATED_DETALLE);

        restConfiguracionesMockMvc.perform(put("/api/configuraciones")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedConfiguraciones)))
            .andExpect(status().isOk());

        // Validate the Configuraciones in the database
        List<Configuraciones> configuracionesList = configuracionesRepository.findAll();
        assertThat(configuracionesList).hasSize(databaseSizeBeforeUpdate);
        Configuraciones testConfiguraciones = configuracionesList.get(configuracionesList.size() - 1);
        assertThat(testConfiguraciones.getClave()).isEqualTo(UPDATED_CLAVE);
        assertThat(testConfiguraciones.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testConfiguraciones.getDetalle()).isEqualTo(UPDATED_DETALLE);
    }

    @Test
    @Transactional
    public void updateNonExistingConfiguraciones() throws Exception {
        int databaseSizeBeforeUpdate = configuracionesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConfiguracionesMockMvc.perform(put("/api/configuraciones")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(configuraciones)))
            .andExpect(status().isBadRequest());

        // Validate the Configuraciones in the database
        List<Configuraciones> configuracionesList = configuracionesRepository.findAll();
        assertThat(configuracionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConfiguraciones() throws Exception {
        // Initialize the database
        configuracionesRepository.saveAndFlush(configuraciones);

        int databaseSizeBeforeDelete = configuracionesRepository.findAll().size();

        // Delete the configuraciones
        restConfiguracionesMockMvc.perform(delete("/api/configuraciones/{id}", configuraciones.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Configuraciones> configuracionesList = configuracionesRepository.findAll();
        assertThat(configuracionesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
