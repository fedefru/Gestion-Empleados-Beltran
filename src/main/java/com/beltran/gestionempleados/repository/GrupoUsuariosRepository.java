package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.GrupoUsuarios;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GrupoUsuarios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrupoUsuariosRepository extends JpaRepository<GrupoUsuarios, Long> {
}
