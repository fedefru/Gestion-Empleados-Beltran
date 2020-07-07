package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.PermisosGrupos;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PermisosGrupos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PermisosGruposRepository extends JpaRepository<PermisosGrupos, Long> {
}
