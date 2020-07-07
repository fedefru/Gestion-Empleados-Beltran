package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Grupos;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Grupos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GruposRepository extends JpaRepository<Grupos, Long> {
}
