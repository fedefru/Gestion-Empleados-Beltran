package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Ciudades;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Ciudades entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CiudadesRepository extends JpaRepository<Ciudades, Long> {

    List<Ciudades> findAllByProviciaId(Long id);
}
