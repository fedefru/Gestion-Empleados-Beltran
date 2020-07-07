package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Direcciones;
import com.beltran.gestionempleados.repository.DireccionesRepository;

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
 * Integration tests for the {@link DireccionesResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DireccionesResourceIT {

    private static final String DEFAULT_CALLE = "AAAAAAAAAA";
    private static final String UPDATED_CALLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_ALTURA = 1;
    private static final Integer UPDATED_ALTURA = 2;

    private static final Integer DEFAULT_PISO = 1;
    private static final Integer UPDATED_PISO = 2;

    private static final String DEFAULT_DEPARTAMENTO = "AAAAAAAAAA";
    private static final String UPDATED_DEPARTAMENTO = "BBBBBBBBBB";

    @Autowired
    private DireccionesRepository direccionesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDireccionesMockMvc;

    private Direcciones direcciones;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Direcciones createEntity(EntityManager em) {
        Direcciones direcciones = new Direcciones()
            .calle(DEFAULT_CALLE)
            .altura(DEFAULT_ALTURA)
            .piso(DEFAULT_PISO)
            .departamento(DEFAULT_DEPARTAMENTO);
        return direcciones;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Direcciones createUpdatedEntity(EntityManager em) {
        Direcciones direcciones = new Direcciones()
            .calle(UPDATED_CALLE)
            .altura(UPDATED_ALTURA)
            .piso(UPDATED_PISO)
            .departamento(UPDATED_DEPARTAMENTO);
        return direcciones;
    }

    @BeforeEach
    public void initTest() {
        direcciones = createEntity(em);
    }

    @Test
    @Transactional
    public void createDirecciones() throws Exception {
        int databaseSizeBeforeCreate = direccionesRepository.findAll().size();
        // Create the Direcciones
        restDireccionesMockMvc.perform(post("/api/direcciones")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(direcciones)))
            .andExpect(status().isCreated());

        // Validate the Direcciones in the database
        List<Direcciones> direccionesList = direccionesRepository.findAll();
        assertThat(direccionesList).hasSize(databaseSizeBeforeCreate + 1);
        Direcciones testDirecciones = direccionesList.get(direccionesList.size() - 1);
        assertThat(testDirecciones.getCalle()).isEqualTo(DEFAULT_CALLE);
        assertThat(testDirecciones.getAltura()).isEqualTo(DEFAULT_ALTURA);
        assertThat(testDirecciones.getPiso()).isEqualTo(DEFAULT_PISO);
        assertThat(testDirecciones.getDepartamento()).isEqualTo(DEFAULT_DEPARTAMENTO);
    }

    @Test
    @Transactional
    public void createDireccionesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = direccionesRepository.findAll().size();

        // Create the Direcciones with an existing ID
        direcciones.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDireccionesMockMvc.perform(post("/api/direcciones")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(direcciones)))
            .andExpect(status().isBadRequest());

        // Validate the Direcciones in the database
        List<Direcciones> direccionesList = direccionesRepository.findAll();
        assertThat(direccionesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDirecciones() throws Exception {
        // Initialize the database
        direccionesRepository.saveAndFlush(direcciones);

        // Get all the direccionesList
        restDireccionesMockMvc.perform(get("/api/direcciones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(direcciones.getId().intValue())))
            .andExpect(jsonPath("$.[*].calle").value(hasItem(DEFAULT_CALLE)))
            .andExpect(jsonPath("$.[*].altura").value(hasItem(DEFAULT_ALTURA)))
            .andExpect(jsonPath("$.[*].piso").value(hasItem(DEFAULT_PISO)))
            .andExpect(jsonPath("$.[*].departamento").value(hasItem(DEFAULT_DEPARTAMENTO)));
    }
    
    @Test
    @Transactional
    public void getDirecciones() throws Exception {
        // Initialize the database
        direccionesRepository.saveAndFlush(direcciones);

        // Get the direcciones
        restDireccionesMockMvc.perform(get("/api/direcciones/{id}", direcciones.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(direcciones.getId().intValue()))
            .andExpect(jsonPath("$.calle").value(DEFAULT_CALLE))
            .andExpect(jsonPath("$.altura").value(DEFAULT_ALTURA))
            .andExpect(jsonPath("$.piso").value(DEFAULT_PISO))
            .andExpect(jsonPath("$.departamento").value(DEFAULT_DEPARTAMENTO));
    }
    @Test
    @Transactional
    public void getNonExistingDirecciones() throws Exception {
        // Get the direcciones
        restDireccionesMockMvc.perform(get("/api/direcciones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDirecciones() throws Exception {
        // Initialize the database
        direccionesRepository.saveAndFlush(direcciones);

        int databaseSizeBeforeUpdate = direccionesRepository.findAll().size();

        // Update the direcciones
        Direcciones updatedDirecciones = direccionesRepository.findById(direcciones.getId()).get();
        // Disconnect from session so that the updates on updatedDirecciones are not directly saved in db
        em.detach(updatedDirecciones);
        updatedDirecciones
            .calle(UPDATED_CALLE)
            .altura(UPDATED_ALTURA)
            .piso(UPDATED_PISO)
            .departamento(UPDATED_DEPARTAMENTO);

        restDireccionesMockMvc.perform(put("/api/direcciones")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDirecciones)))
            .andExpect(status().isOk());

        // Validate the Direcciones in the database
        List<Direcciones> direccionesList = direccionesRepository.findAll();
        assertThat(direccionesList).hasSize(databaseSizeBeforeUpdate);
        Direcciones testDirecciones = direccionesList.get(direccionesList.size() - 1);
        assertThat(testDirecciones.getCalle()).isEqualTo(UPDATED_CALLE);
        assertThat(testDirecciones.getAltura()).isEqualTo(UPDATED_ALTURA);
        assertThat(testDirecciones.getPiso()).isEqualTo(UPDATED_PISO);
        assertThat(testDirecciones.getDepartamento()).isEqualTo(UPDATED_DEPARTAMENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingDirecciones() throws Exception {
        int databaseSizeBeforeUpdate = direccionesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDireccionesMockMvc.perform(put("/api/direcciones")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(direcciones)))
            .andExpect(status().isBadRequest());

        // Validate the Direcciones in the database
        List<Direcciones> direccionesList = direccionesRepository.findAll();
        assertThat(direccionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDirecciones() throws Exception {
        // Initialize the database
        direccionesRepository.saveAndFlush(direcciones);

        int databaseSizeBeforeDelete = direccionesRepository.findAll().size();

        // Delete the direcciones
        restDireccionesMockMvc.perform(delete("/api/direcciones/{id}", direcciones.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Direcciones> direccionesList = direccionesRepository.findAll();
        assertThat(direccionesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
