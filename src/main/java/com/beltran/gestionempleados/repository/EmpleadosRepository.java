package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Empleados;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Empleados entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpleadosRepository extends JpaRepository<Empleados, Long> {
}
