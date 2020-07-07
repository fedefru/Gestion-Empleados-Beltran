package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Areas;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Areas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AreasRepository extends JpaRepository<Areas, Long> {
}
