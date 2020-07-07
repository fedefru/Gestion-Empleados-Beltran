package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.TipoContactos;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoContactos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoContactosRepository extends JpaRepository<TipoContactos, Long> {
}
