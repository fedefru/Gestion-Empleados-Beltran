package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Permisos;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Permisos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PermisosRepository extends JpaRepository<Permisos, Long> {
}
