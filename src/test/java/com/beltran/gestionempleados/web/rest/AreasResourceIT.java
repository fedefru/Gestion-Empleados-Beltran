package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Areas;
import com.beltran.gestionempleados.repository.AreasRepository;

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
 * Integration tests for the {@link AreasResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AreasResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_COD_SECTOR = "AAAAAAAAAA";
    private static final String UPDATED_COD_SECTOR = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVO = false;
    private static final Boolean UPDATED_ACTIVO = true;

    @Autowired
    private AreasRepository areasRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAreasMockMvc;

    private Areas areas;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Areas createEntity(EntityManager em) {
        Areas areas = new Areas()
            .nombre(DEFAULT_NOMBRE)
            .codSector(DEFAULT_COD_SECTOR)
            .activo(DEFAULT_ACTIVO);
        return areas;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Areas createUpdatedEntity(EntityManager em) {
        Areas areas = new Areas()
            .nombre(UPDATED_NOMBRE)
            .codSector(UPDATED_COD_SECTOR)
            .activo(UPDATED_ACTIVO);
        return areas;
    }

    @BeforeEach
    public void initTest() {
        areas = createEntity(em);
    }

    @Test
    @Transactional
    public void createAreas() throws Exception {
        int databaseSizeBeforeCreate = areasRepository.findAll().size();
        // Create the Areas
        restAreasMockMvc.perform(post("/api/areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(areas)))
            .andExpect(status().isCreated());

        // Validate the Areas in the database
        List<Areas> areasList = areasRepository.findAll();
        assertThat(areasList).hasSize(databaseSizeBeforeCreate + 1);
        Areas testAreas = areasList.get(areasList.size() - 1);
        assertThat(testAreas.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testAreas.getCodSector()).isEqualTo(DEFAULT_COD_SECTOR);
        assertThat(testAreas.isActivo()).isEqualTo(DEFAULT_ACTIVO);
    }

    @Test
    @Transactional
    public void createAreasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = areasRepository.findAll().size();

        // Create the Areas with an existing ID
        areas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAreasMockMvc.perform(post("/api/areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(areas)))
            .andExpect(status().isBadRequest());

        // Validate the Areas in the database
        List<Areas> areasList = areasRepository.findAll();
        assertThat(areasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAreas() throws Exception {
        // Initialize the database
        areasRepository.saveAndFlush(areas);

        // Get all the areasList
        restAreasMockMvc.perform(get("/api/areas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(areas.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].codSector").value(hasItem(DEFAULT_COD_SECTOR)))
            .andExpect(jsonPath("$.[*].activo").value(hasItem(DEFAULT_ACTIVO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getAreas() throws Exception {
        // Initialize the database
        areasRepository.saveAndFlush(areas);

        // Get the areas
        restAreasMockMvc.perform(get("/api/areas/{id}", areas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(areas.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.codSector").value(DEFAULT_COD_SECTOR))
            .andExpect(jsonPath("$.activo").value(DEFAULT_ACTIVO.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingAreas() throws Exception {
        // Get the areas
        restAreasMockMvc.perform(get("/api/areas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAreas() throws Exception {
        // Initialize the database
        areasRepository.saveAndFlush(areas);

        int databaseSizeBeforeUpdate = areasRepository.findAll().size();

        // Update the areas
        Areas updatedAreas = areasRepository.findById(areas.getId()).get();
        // Disconnect from session so that the updates on updatedAreas are not directly saved in db
        em.detach(updatedAreas);
        updatedAreas
            .nombre(UPDATED_NOMBRE)
            .codSector(UPDATED_COD_SECTOR)
            .activo(UPDATED_ACTIVO);

        restAreasMockMvc.perform(put("/api/areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAreas)))
            .andExpect(status().isOk());

        // Validate the Areas in the database
        List<Areas> areasList = areasRepository.findAll();
        assertThat(areasList).hasSize(databaseSizeBeforeUpdate);
        Areas testAreas = areasList.get(areasList.size() - 1);
        assertThat(testAreas.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testAreas.getCodSector()).isEqualTo(UPDATED_COD_SECTOR);
        assertThat(testAreas.isActivo()).isEqualTo(UPDATED_ACTIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingAreas() throws Exception {
        int databaseSizeBeforeUpdate = areasRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAreasMockMvc.perform(put("/api/areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(areas)))
            .andExpect(status().isBadRequest());

        // Validate the Areas in the database
        List<Areas> areasList = areasRepository.findAll();
        assertThat(areasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAreas() throws Exception {
        // Initialize the database
        areasRepository.saveAndFlush(areas);

        int databaseSizeBeforeDelete = areasRepository.findAll().size();

        // Delete the areas
        restAreasMockMvc.perform(delete("/api/areas/{id}", areas.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Areas> areasList = areasRepository.findAll();
        assertThat(areasList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
