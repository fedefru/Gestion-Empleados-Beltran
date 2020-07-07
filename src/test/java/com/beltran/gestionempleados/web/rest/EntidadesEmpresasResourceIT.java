package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.EntidadesEmpresas;
import com.beltran.gestionempleados.repository.EntidadesEmpresasRepository;

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
 * Integration tests for the {@link EntidadesEmpresasResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EntidadesEmpresasResourceIT {

    private static final String DEFAULT_VALOR = "AAAAAAAAAA";
    private static final String UPDATED_VALOR = "BBBBBBBBBB";

    @Autowired
    private EntidadesEmpresasRepository entidadesEmpresasRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEntidadesEmpresasMockMvc;

    private EntidadesEmpresas entidadesEmpresas;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntidadesEmpresas createEntity(EntityManager em) {
        EntidadesEmpresas entidadesEmpresas = new EntidadesEmpresas()
            .valor(DEFAULT_VALOR);
        return entidadesEmpresas;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntidadesEmpresas createUpdatedEntity(EntityManager em) {
        EntidadesEmpresas entidadesEmpresas = new EntidadesEmpresas()
            .valor(UPDATED_VALOR);
        return entidadesEmpresas;
    }

    @BeforeEach
    public void initTest() {
        entidadesEmpresas = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntidadesEmpresas() throws Exception {
        int databaseSizeBeforeCreate = entidadesEmpresasRepository.findAll().size();
        // Create the EntidadesEmpresas
        restEntidadesEmpresasMockMvc.perform(post("/api/entidades-empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entidadesEmpresas)))
            .andExpect(status().isCreated());

        // Validate the EntidadesEmpresas in the database
        List<EntidadesEmpresas> entidadesEmpresasList = entidadesEmpresasRepository.findAll();
        assertThat(entidadesEmpresasList).hasSize(databaseSizeBeforeCreate + 1);
        EntidadesEmpresas testEntidadesEmpresas = entidadesEmpresasList.get(entidadesEmpresasList.size() - 1);
        assertThat(testEntidadesEmpresas.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    public void createEntidadesEmpresasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entidadesEmpresasRepository.findAll().size();

        // Create the EntidadesEmpresas with an existing ID
        entidadesEmpresas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntidadesEmpresasMockMvc.perform(post("/api/entidades-empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entidadesEmpresas)))
            .andExpect(status().isBadRequest());

        // Validate the EntidadesEmpresas in the database
        List<EntidadesEmpresas> entidadesEmpresasList = entidadesEmpresasRepository.findAll();
        assertThat(entidadesEmpresasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEntidadesEmpresas() throws Exception {
        // Initialize the database
        entidadesEmpresasRepository.saveAndFlush(entidadesEmpresas);

        // Get all the entidadesEmpresasList
        restEntidadesEmpresasMockMvc.perform(get("/api/entidades-empresas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entidadesEmpresas.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)));
    }
    
    @Test
    @Transactional
    public void getEntidadesEmpresas() throws Exception {
        // Initialize the database
        entidadesEmpresasRepository.saveAndFlush(entidadesEmpresas);

        // Get the entidadesEmpresas
        restEntidadesEmpresasMockMvc.perform(get("/api/entidades-empresas/{id}", entidadesEmpresas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entidadesEmpresas.getId().intValue()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR));
    }
    @Test
    @Transactional
    public void getNonExistingEntidadesEmpresas() throws Exception {
        // Get the entidadesEmpresas
        restEntidadesEmpresasMockMvc.perform(get("/api/entidades-empresas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntidadesEmpresas() throws Exception {
        // Initialize the database
        entidadesEmpresasRepository.saveAndFlush(entidadesEmpresas);

        int databaseSizeBeforeUpdate = entidadesEmpresasRepository.findAll().size();

        // Update the entidadesEmpresas
        EntidadesEmpresas updatedEntidadesEmpresas = entidadesEmpresasRepository.findById(entidadesEmpresas.getId()).get();
        // Disconnect from session so that the updates on updatedEntidadesEmpresas are not directly saved in db
        em.detach(updatedEntidadesEmpresas);
        updatedEntidadesEmpresas
            .valor(UPDATED_VALOR);

        restEntidadesEmpresasMockMvc.perform(put("/api/entidades-empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntidadesEmpresas)))
            .andExpect(status().isOk());

        // Validate the EntidadesEmpresas in the database
        List<EntidadesEmpresas> entidadesEmpresasList = entidadesEmpresasRepository.findAll();
        assertThat(entidadesEmpresasList).hasSize(databaseSizeBeforeUpdate);
        EntidadesEmpresas testEntidadesEmpresas = entidadesEmpresasList.get(entidadesEmpresasList.size() - 1);
        assertThat(testEntidadesEmpresas.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void updateNonExistingEntidadesEmpresas() throws Exception {
        int databaseSizeBeforeUpdate = entidadesEmpresasRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntidadesEmpresasMockMvc.perform(put("/api/entidades-empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entidadesEmpresas)))
            .andExpect(status().isBadRequest());

        // Validate the EntidadesEmpresas in the database
        List<EntidadesEmpresas> entidadesEmpresasList = entidadesEmpresasRepository.findAll();
        assertThat(entidadesEmpresasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEntidadesEmpresas() throws Exception {
        // Initialize the database
        entidadesEmpresasRepository.saveAndFlush(entidadesEmpresas);

        int databaseSizeBeforeDelete = entidadesEmpresasRepository.findAll().size();

        // Delete the entidadesEmpresas
        restEntidadesEmpresasMockMvc.perform(delete("/api/entidades-empresas/{id}", entidadesEmpresas.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EntidadesEmpresas> entidadesEmpresasList = entidadesEmpresasRepository.findAll();
        assertThat(entidadesEmpresasList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
