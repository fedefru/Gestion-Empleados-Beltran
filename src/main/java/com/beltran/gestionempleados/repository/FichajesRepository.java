package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Fichajes;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Fichajes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FichajesRepository extends JpaRepository<Fichajes, Long> {

    @Query(
        value="SELECT ruta_imagen from FICHAJES where USUARIO_ID = :idUsuarioImagen",
        nativeQuery = true)
    List<String> findRutasById(@Param(value="idUsuarioImagen") String idUsuarioImagen);

}




