package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Permisos;
import com.beltran.gestionempleados.repository.PermisosRepository;

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
 * Integration tests for the {@link PermisosResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PermisosResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private PermisosRepository permisosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPermisosMockMvc;

    private Permisos permisos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Permisos createEntity(EntityManager em) {
        Permisos permisos = new Permisos()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return permisos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Permisos createUpdatedEntity(EntityManager em) {
        Permisos permisos = new Permisos()
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);
        return permisos;
    }

    @BeforeEach
    public void initTest() {
        permisos = createEntity(em);
    }

    @Test
    @Transactional
    public void createPermisos() throws Exception {
        int databaseSizeBeforeCreate = permisosRepository.findAll().size();
        // Create the Permisos
        restPermisosMockMvc.perform(post("/api/permisos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(permisos)))
            .andExpect(status().isCreated());

        // Validate the Permisos in the database
        List<Permisos> permisosList = permisosRepository.findAll();
        assertThat(permisosList).hasSize(databaseSizeBeforeCreate + 1);
        Permisos testPermisos = permisosList.get(permisosList.size() - 1);
        assertThat(testPermisos.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPermisos.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createPermisosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = permisosRepository.findAll().size();

        // Create the Permisos with an existing ID
        permisos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPermisosMockMvc.perform(post("/api/permisos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(permisos)))
            .andExpect(status().isBadRequest());

        // Validate the Permisos in the database
        List<Permisos> permisosList = permisosRepository.findAll();
        assertThat(permisosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPermisos() throws Exception {
        // Initialize the database
        permisosRepository.saveAndFlush(permisos);

        // Get all the permisosList
        restPermisosMockMvc.perform(get("/api/permisos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(permisos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getPermisos() throws Exception {
        // Initialize the database
        permisosRepository.saveAndFlush(permisos);

        // Get the permisos
        restPermisosMockMvc.perform(get("/api/permisos/{id}", permisos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(permisos.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }
    @Test
    @Transactional
    public void getNonExistingPermisos() throws Exception {
        // Get the permisos
        restPermisosMockMvc.perform(get("/api/permisos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePermisos() throws Exception {
        // Initialize the database
        permisosRepository.saveAndFlush(permisos);

        int databaseSizeBeforeUpdate = permisosRepository.findAll().size();

        // Update the permisos
        Permisos updatedPermisos = permisosRepository.findById(permisos.getId()).get();
        // Disconnect from session so that the updates on updatedPermisos are not directly saved in db
        em.detach(updatedPermisos);
        updatedPermisos
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);

        restPermisosMockMvc.perform(put("/api/permisos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPermisos)))
            .andExpect(status().isOk());

        // Validate the Permisos in the database
        List<Permisos> permisosList = permisosRepository.findAll();
        assertThat(permisosList).hasSize(databaseSizeBeforeUpdate);
        Permisos testPermisos = permisosList.get(permisosList.size() - 1);
        assertThat(testPermisos.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPermisos.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingPermisos() throws Exception {
        int databaseSizeBeforeUpdate = permisosRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPermisosMockMvc.perform(put("/api/permisos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(permisos)))
            .andExpect(status().isBadRequest());

        // Validate the Permisos in the database
        List<Permisos> permisosList = permisosRepository.findAll();
        assertThat(permisosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePermisos() throws Exception {
        // Initialize the database
        permisosRepository.saveAndFlush(permisos);

        int databaseSizeBeforeDelete = permisosRepository.findAll().size();

        // Delete the permisos
        restPermisosMockMvc.perform(delete("/api/permisos/{id}", permisos.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Permisos> permisosList = permisosRepository.findAll();
        assertThat(permisosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
