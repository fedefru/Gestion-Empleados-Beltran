package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.ContactoEmpresas;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ContactoEmpresas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactoEmpresasRepository extends JpaRepository<ContactoEmpresas, Long> {
}
