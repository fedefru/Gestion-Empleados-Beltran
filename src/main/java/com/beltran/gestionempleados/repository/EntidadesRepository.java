package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Entidades;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Entidades entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntidadesRepository extends JpaRepository<Entidades, Long> {
}
