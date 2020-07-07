package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.PermisosGrupos;
import com.beltran.gestionempleados.repository.PermisosGruposRepository;

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
 * Integration tests for the {@link PermisosGruposResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PermisosGruposResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private PermisosGruposRepository permisosGruposRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPermisosGruposMockMvc;

    private PermisosGrupos permisosGrupos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PermisosGrupos createEntity(EntityManager em) {
        PermisosGrupos permisosGrupos = new PermisosGrupos()
            .nombre(DEFAULT_NOMBRE);
        return permisosGrupos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PermisosGrupos createUpdatedEntity(EntityManager em) {
        PermisosGrupos permisosGrupos = new PermisosGrupos()
            .nombre(UPDATED_NOMBRE);
        return permisosGrupos;
    }

    @BeforeEach
    public void initTest() {
        permisosGrupos = createEntity(em);
    }

    @Test
    @Transactional
    public void createPermisosGrupos() throws Exception {
        int databaseSizeBeforeCreate = permisosGruposRepository.findAll().size();
        // Create the PermisosGrupos
        restPermisosGruposMockMvc.perform(post("/api/permisos-grupos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(permisosGrupos)))
            .andExpect(status().isCreated());

        // Validate the PermisosGrupos in the database
        List<PermisosGrupos> permisosGruposList = permisosGruposRepository.findAll();
        assertThat(permisosGruposList).hasSize(databaseSizeBeforeCreate + 1);
        PermisosGrupos testPermisosGrupos = permisosGruposList.get(permisosGruposList.size() - 1);
        assertThat(testPermisosGrupos.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createPermisosGruposWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = permisosGruposRepository.findAll().size();

        // Create the PermisosGrupos with an existing ID
        permisosGrupos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPermisosGruposMockMvc.perform(post("/api/permisos-grupos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(permisosGrupos)))
            .andExpect(status().isBadRequest());

        // Validate the PermisosGrupos in the database
        List<PermisosGrupos> permisosGruposList = permisosGruposRepository.findAll();
        assertThat(permisosGruposList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPermisosGrupos() throws Exception {
        // Initialize the database
        permisosGruposRepository.saveAndFlush(permisosGrupos);

        // Get all the permisosGruposList
        restPermisosGruposMockMvc.perform(get("/api/permisos-grupos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(permisosGrupos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getPermisosGrupos() throws Exception {
        // Initialize the database
        permisosGruposRepository.saveAndFlush(permisosGrupos);

        // Get the permisosGrupos
        restPermisosGruposMockMvc.perform(get("/api/permisos-grupos/{id}", permisosGrupos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(permisosGrupos.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }
    @Test
    @Transactional
    public void getNonExistingPermisosGrupos() throws Exception {
        // Get the permisosGrupos
        restPermisosGruposMockMvc.perform(get("/api/permisos-grupos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePermisosGrupos() throws Exception {
        // Initialize the database
        permisosGruposRepository.saveAndFlush(permisosGrupos);

        int databaseSizeBeforeUpdate = permisosGruposRepository.findAll().size();

        // Update the permisosGrupos
        PermisosGrupos updatedPermisosGrupos = permisosGruposRepository.findById(permisosGrupos.getId()).get();
        // Disconnect from session so that the updates on updatedPermisosGrupos are not directly saved in db
        em.detach(updatedPermisosGrupos);
        updatedPermisosGrupos
            .nombre(UPDATED_NOMBRE);

        restPermisosGruposMockMvc.perform(put("/api/permisos-grupos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPermisosGrupos)))
            .andExpect(status().isOk());

        // Validate the PermisosGrupos in the database
        List<PermisosGrupos> permisosGruposList = permisosGruposRepository.findAll();
        assertThat(permisosGruposList).hasSize(databaseSizeBeforeUpdate);
        PermisosGrupos testPermisosGrupos = permisosGruposList.get(permisosGruposList.size() - 1);
        assertThat(testPermisosGrupos.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingPermisosGrupos() throws Exception {
        int databaseSizeBeforeUpdate = permisosGruposRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPermisosGruposMockMvc.perform(put("/api/permisos-grupos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(permisosGrupos)))
            .andExpect(status().isBadRequest());

        // Validate the PermisosGrupos in the database
        List<PermisosGrupos> permisosGruposList = permisosGruposRepository.findAll();
        assertThat(permisosGruposList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePermisosGrupos() throws Exception {
        // Initialize the database
        permisosGruposRepository.saveAndFlush(permisosGrupos);

        int databaseSizeBeforeDelete = permisosGruposRepository.findAll().size();

        // Delete the permisosGrupos
        restPermisosGruposMockMvc.perform(delete("/api/permisos-grupos/{id}", permisosGrupos.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PermisosGrupos> permisosGruposList = permisosGruposRepository.findAll();
        assertThat(permisosGruposList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
