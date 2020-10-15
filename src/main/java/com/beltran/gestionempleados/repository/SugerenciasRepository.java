package com.beltran.gestionempleados.repository;

import com.beltran.gestionempleados.domain.Sugerencias;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface SugerenciasRepository extends JpaRepository<Sugerencias, Long> {

    List<Sugerencias> findAllByOrderByIdDesc();

}
