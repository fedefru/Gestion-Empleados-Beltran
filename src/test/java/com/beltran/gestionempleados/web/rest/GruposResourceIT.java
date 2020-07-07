package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Grupos;
import com.beltran.gestionempleados.repository.GruposRepository;

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
 * Integration tests for the {@link GruposResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class GruposResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private GruposRepository gruposRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGruposMockMvc;

    private Grupos grupos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Grupos createEntity(EntityManager em) {
        Grupos grupos = new Grupos()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return grupos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Grupos createUpdatedEntity(EntityManager em) {
        Grupos grupos = new Grupos()
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);
        return grupos;
    }

    @BeforeEach
    public void initTest() {
        grupos = createEntity(em);
    }

    @Test
    @Transactional
    public void createGrupos() throws Exception {
        int databaseSizeBeforeCreate = gruposRepository.findAll().size();
        // Create the Grupos
        restGruposMockMvc.perform(post("/api/grupos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupos)))
            .andExpect(status().isCreated());

        // Validate the Grupos in the database
        List<Grupos> gruposList = gruposRepository.findAll();
        assertThat(gruposList).hasSize(databaseSizeBeforeCreate + 1);
        Grupos testGrupos = gruposList.get(gruposList.size() - 1);
        assertThat(testGrupos.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testGrupos.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createGruposWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gruposRepository.findAll().size();

        // Create the Grupos with an existing ID
        grupos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGruposMockMvc.perform(post("/api/grupos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupos)))
            .andExpect(status().isBadRequest());

        // Validate the Grupos in the database
        List<Grupos> gruposList = gruposRepository.findAll();
        assertThat(gruposList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGrupos() throws Exception {
        // Initialize the database
        gruposRepository.saveAndFlush(grupos);

        // Get all the gruposList
        restGruposMockMvc.perform(get("/api/grupos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grupos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getGrupos() throws Exception {
        // Initialize the database
        gruposRepository.saveAndFlush(grupos);

        // Get the grupos
        restGruposMockMvc.perform(get("/api/grupos/{id}", grupos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(grupos.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }
    @Test
    @Transactional
    public void getNonExistingGrupos() throws Exception {
        // Get the grupos
        restGruposMockMvc.perform(get("/api/grupos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGrupos() throws Exception {
        // Initialize the database
        gruposRepository.saveAndFlush(grupos);

        int databaseSizeBeforeUpdate = gruposRepository.findAll().size();

        // Update the grupos
        Grupos updatedGrupos = gruposRepository.findById(grupos.getId()).get();
        // Disconnect from session so that the updates on updatedGrupos are not directly saved in db
        em.detach(updatedGrupos);
        updatedGrupos
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);

        restGruposMockMvc.perform(put("/api/grupos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGrupos)))
            .andExpect(status().isOk());

        // Validate the Grupos in the database
        List<Grupos> gruposList = gruposRepository.findAll();
        assertThat(gruposList).hasSize(databaseSizeBeforeUpdate);
        Grupos testGrupos = gruposList.get(gruposList.size() - 1);
        assertThat(testGrupos.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testGrupos.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingGrupos() throws Exception {
        int databaseSizeBeforeUpdate = gruposRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGruposMockMvc.perform(put("/api/grupos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupos)))
            .andExpect(status().isBadRequest());

        // Validate the Grupos in the database
        List<Grupos> gruposList = gruposRepository.findAll();
        assertThat(gruposList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGrupos() throws Exception {
        // Initialize the database
        gruposRepository.saveAndFlush(grupos);

        int databaseSizeBeforeDelete = gruposRepository.findAll().size();

        // Delete the grupos
        restGruposMockMvc.perform(delete("/api/grupos/{id}", grupos.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Grupos> gruposList = gruposRepository.findAll();
        assertThat(gruposList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
