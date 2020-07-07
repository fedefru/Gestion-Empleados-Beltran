package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.ContactoUsuarios;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ContactoUsuarios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactoUsuariosRepository extends JpaRepository<ContactoUsuarios, Long> {
}
