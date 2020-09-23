package com.cdainfo.repository;

import com.cdainfo.domain.Inventario;
import com.cdainfo.domain.Modelo;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data  repository for the Inventario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InventarioRepository extends JpaRepository<Inventario, Long> {
    List<Inventario>findAllByActualizacionIsNull();

    List<Inventario>findAllByFechaEntrega(LocalDate fecha);

    @Query(
        value="SELECT inventario.*,usuario.apellido,equipo.nombre,sede.name FROM \n" +
            "EQUIPO INNER JOIN INVENTARIO ON (inventario.EQUIPO_ID = equipo.id) \n" +
            "INNER JOIN USUARIO ON (inventario.usuario_id= usuario.id) \n" +
            "INNER JOIN SEDE ON (inventario.sede_id = sede.id) \n" +
            "WHERE lower(inventario.comentario) LIKE :searchComentario or \n" +
            "lower(equipo.nombre) LIKE :searchEquipo  or \n" +
            "lower(usuario.apellido) LIKE :searchUsuario or \n" +
            "lower(sede.name) LIKE :searchSede",
        nativeQuery = true)
        List<Inventario> findFilter(@Param(value="searchComentario") String searchComentario,
        @Param(value="searchEquipo") String searchEquipo,
        @Param(value="searchUsuario") String searchUsuario,
        @Param(value="searchSede") String searchSede);

}
