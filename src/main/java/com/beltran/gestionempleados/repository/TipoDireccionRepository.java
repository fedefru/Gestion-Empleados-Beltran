package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.TipoDireccion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoDireccion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoDireccionRepository extends JpaRepository<TipoDireccion, Long> {
}
