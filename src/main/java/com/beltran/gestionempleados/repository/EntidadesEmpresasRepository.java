package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.EntidadesEmpresas;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EntidadesEmpresas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntidadesEmpresasRepository extends JpaRepository<EntidadesEmpresas, Long> {
}
