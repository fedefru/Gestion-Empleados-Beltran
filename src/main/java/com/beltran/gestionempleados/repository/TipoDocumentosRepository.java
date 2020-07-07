package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.TipoDocumentos;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoDocumentos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoDocumentosRepository extends JpaRepository<TipoDocumentos, Long> {
}
