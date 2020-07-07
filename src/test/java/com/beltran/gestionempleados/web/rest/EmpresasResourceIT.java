package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Empresas;
import com.beltran.gestionempleados.repository.EmpresasRepository;

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
 * Integration tests for the {@link EmpresasResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EmpresasResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private EmpresasRepository empresasRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmpresasMockMvc;

    private Empresas empresas;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Empresas createEntity(EntityManager em) {
        Empresas empresas = new Empresas()
            .nombre(DEFAULT_NOMBRE);
        return empresas;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Empresas createUpdatedEntity(EntityManager em) {
        Empresas empresas = new Empresas()
            .nombre(UPDATED_NOMBRE);
        return empresas;
    }

    @BeforeEach
    public void initTest() {
        empresas = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmpresas() throws Exception {
        int databaseSizeBeforeCreate = empresasRepository.findAll().size();
        // Create the Empresas
        restEmpresasMockMvc.perform(post("/api/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empresas)))
            .andExpect(status().isCreated());

        // Validate the Empresas in the database
        List<Empresas> empresasList = empresasRepository.findAll();
        assertThat(empresasList).hasSize(databaseSizeBeforeCreate + 1);
        Empresas testEmpresas = empresasList.get(empresasList.size() - 1);
        assertThat(testEmpresas.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createEmpresasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = empresasRepository.findAll().size();

        // Create the Empresas with an existing ID
        empresas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmpresasMockMvc.perform(post("/api/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empresas)))
            .andExpect(status().isBadRequest());

        // Validate the Empresas in the database
        List<Empresas> empresasList = empresasRepository.findAll();
        assertThat(empresasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEmpresas() throws Exception {
        // Initialize the database
        empresasRepository.saveAndFlush(empresas);

        // Get all the empresasList
        restEmpresasMockMvc.perform(get("/api/empresas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(empresas.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getEmpresas() throws Exception {
        // Initialize the database
        empresasRepository.saveAndFlush(empresas);

        // Get the empresas
        restEmpresasMockMvc.perform(get("/api/empresas/{id}", empresas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(empresas.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }
    @Test
    @Transactional
    public void getNonExistingEmpresas() throws Exception {
        // Get the empresas
        restEmpresasMockMvc.perform(get("/api/empresas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmpresas() throws Exception {
        // Initialize the database
        empresasRepository.saveAndFlush(empresas);

        int databaseSizeBeforeUpdate = empresasRepository.findAll().size();

        // Update the empresas
        Empresas updatedEmpresas = empresasRepository.findById(empresas.getId()).get();
        // Disconnect from session so that the updates on updatedEmpresas are not directly saved in db
        em.detach(updatedEmpresas);
        updatedEmpresas
            .nombre(UPDATED_NOMBRE);

        restEmpresasMockMvc.perform(put("/api/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmpresas)))
            .andExpect(status().isOk());

        // Validate the Empresas in the database
        List<Empresas> empresasList = empresasRepository.findAll();
        assertThat(empresasList).hasSize(databaseSizeBeforeUpdate);
        Empresas testEmpresas = empresasList.get(empresasList.size() - 1);
        assertThat(testEmpresas.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingEmpresas() throws Exception {
        int databaseSizeBeforeUpdate = empresasRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmpresasMockMvc.perform(put("/api/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empresas)))
            .andExpect(status().isBadRequest());

        // Validate the Empresas in the database
        List<Empresas> empresasList = empresasRepository.findAll();
        assertThat(empresasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmpresas() throws Exception {
        // Initialize the database
        empresasRepository.saveAndFlush(empresas);

        int databaseSizeBeforeDelete = empresasRepository.findAll().size();

        // Delete the empresas
        restEmpresasMockMvc.perform(delete("/api/empresas/{id}", empresas.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Empresas> empresasList = empresasRepository.findAll();
        assertThat(empresasList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
