package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Configuraciones;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Configuraciones entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConfiguracionesRepository extends JpaRepository<Configuraciones, Long> {
}
