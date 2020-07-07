package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.EntidadesUsuarios;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EntidadesUsuarios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntidadesUsuariosRepository extends JpaRepository<EntidadesUsuarios, Long> {
}
