package com.beltran.gestionempleados.web.rest;

import com.beltran.gestionempleados.GestionEmpleadosApp;
import com.beltran.gestionempleados.domain.Empleados;
import com.beltran.gestionempleados.repository.EmpleadosRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EmpleadosResource} REST controller.
 */
@SpringBootTest(classes = GestionEmpleadosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EmpleadosResourceIT {

    private static final LocalDate DEFAULT_FECHA_INGRESO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_INGRESO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EmpleadosRepository empleadosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmpleadosMockMvc;

    private Empleados empleados;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Empleados createEntity(EntityManager em) {
        Empleados empleados = new Empleados()
            .fechaIngreso(DEFAULT_FECHA_INGRESO);
        return empleados;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Empleados createUpdatedEntity(EntityManager em) {
        Empleados empleados = new Empleados()
            .fechaIngreso(UPDATED_FECHA_INGRESO);
        return empleados;
    }

    @BeforeEach
    public void initTest() {
        empleados = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmpleados() throws Exception {
        int databaseSizeBeforeCreate = empleadosRepository.findAll().size();
        // Create the Empleados
        restEmpleadosMockMvc.perform(post("/api/empleados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empleados)))
            .andExpect(status().isCreated());

        // Validate the Empleados in the database
        List<Empleados> empleadosList = empleadosRepository.findAll();
        assertThat(empleadosList).hasSize(databaseSizeBeforeCreate + 1);
        Empleados testEmpleados = empleadosList.get(empleadosList.size() - 1);
        assertThat(testEmpleados.getFechaIngreso()).isEqualTo(DEFAULT_FECHA_INGRESO);
    }

    @Test
    @Transactional
    public void createEmpleadosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = empleadosRepository.findAll().size();

        // Create the Empleados with an existing ID
        empleados.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmpleadosMockMvc.perform(post("/api/empleados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empleados)))
            .andExpect(status().isBadRequest());

        // Validate the Empleados in the database
        List<Empleados> empleadosList = empleadosRepository.findAll();
        assertThat(empleadosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEmpleados() throws Exception {
        // Initialize the database
        empleadosRepository.saveAndFlush(empleados);

        // Get all the empleadosList
        restEmpleadosMockMvc.perform(get("/api/empleados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(empleados.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaIngreso").value(hasItem(DEFAULT_FECHA_INGRESO.toString())));
    }
    
    @Test
    @Transactional
    public void getEmpleados() throws Exception {
        // Initialize the database
        empleadosRepository.saveAndFlush(empleados);

        // Get the empleados
        restEmpleadosMockMvc.perform(get("/api/empleados/{id}", empleados.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(empleados.getId().intValue()))
            .andExpect(jsonPath("$.fechaIngreso").value(DEFAULT_FECHA_INGRESO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEmpleados() throws Exception {
        // Get the empleados
        restEmpleadosMockMvc.perform(get("/api/empleados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmpleados() throws Exception {
        // Initialize the database
        empleadosRepository.saveAndFlush(empleados);

        int databaseSizeBeforeUpdate = empleadosRepository.findAll().size();

        // Update the empleados
        Empleados updatedEmpleados = empleadosRepository.findById(empleados.getId()).get();
        // Disconnect from session so that the updates on updatedEmpleados are not directly saved in db
        em.detach(updatedEmpleados);
        updatedEmpleados
            .fechaIngreso(UPDATED_FECHA_INGRESO);

        restEmpleadosMockMvc.perform(put("/api/empleados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmpleados)))
            .andExpect(status().isOk());

        // Validate the Empleados in the database
        List<Empleados> empleadosList = empleadosRepository.findAll();
        assertThat(empleadosList).hasSize(databaseSizeBeforeUpdate);
        Empleados testEmpleados = empleadosList.get(empleadosList.size() - 1);
        assertThat(testEmpleados.getFechaIngreso()).isEqualTo(UPDATED_FECHA_INGRESO);
    }

    @Test
    @Transactional
    public void updateNonExistingEmpleados() throws Exception {
        int databaseSizeBeforeUpdate = empleadosRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmpleadosMockMvc.perform(put("/api/empleados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empleados)))
            .andExpect(status().isBadRequest());

        // Validate the Empleados in the database
        List<Empleados> empleadosList = empleadosRepository.findAll();
        assertThat(empleadosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmpleados() throws Exception {
        // Initialize the database
        empleadosRepository.saveAndFlush(empleados);

        int databaseSizeBeforeDelete = empleadosRepository.findAll().size();

        // Delete the empleados
        restEmpleadosMockMvc.perform(delete("/api/empleados/{id}", empleados.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Empleados> empleadosList = empleadosRepository.findAll();
        assertThat(empleadosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
