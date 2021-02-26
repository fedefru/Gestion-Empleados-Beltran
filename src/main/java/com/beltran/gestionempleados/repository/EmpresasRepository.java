package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Empresas;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Empresas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpresasRepository extends JpaRepository<Empresas, Long> {
    Optional<Empresas> findByUsuario(String nombre);
}
