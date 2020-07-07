package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Direcciones;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Direcciones entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DireccionesRepository extends JpaRepository<Direcciones, Long> {
}
