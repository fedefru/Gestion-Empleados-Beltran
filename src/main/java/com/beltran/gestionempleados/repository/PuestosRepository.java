package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Puestos;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Puestos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PuestosRepository extends JpaRepository<Puestos, Long> {
}
