package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Fichajes;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Fichajes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FichajesRepository extends JpaRepository<Fichajes, Long> {
}
