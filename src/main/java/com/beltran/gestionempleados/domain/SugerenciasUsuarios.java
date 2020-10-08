package com.beltran.gestionempleados.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "sugerencias_usuarios")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SugerenciasUsuarios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = "", allowSetters = true)
    private Sugerencias sugerencias;

    @ManyToOne
    @JsonIgnoreProperties(value = "", allowSetters = true)
    private Usuarios usuario;

    @Column(name = "like")
    private Boolean like;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sugerencias getSugerencias() {
        return sugerencias;
    }

    public void setSugerencias(Sugerencias sugerencias) {
        this.sugerencias = sugerencias;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }

    public Boolean getLike() {
        return like;
    }

    public void setLike(Boolean like) {
        this.like = like;
    }
}
