package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Paises;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Paises entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaisesRepository extends JpaRepository<Paises, Long> {
    Optional<Paises> findByNombre(String nombre);
}
