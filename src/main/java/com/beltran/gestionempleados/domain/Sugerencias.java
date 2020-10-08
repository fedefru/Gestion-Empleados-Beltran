package com.beltran.gestionempleados.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "sugerencias")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sugerencias implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "asunto")
    private String asunto;

    @Column(name = "prioridad")
    private String prioridad;

    @Column(name = "mensaje")
    private String mensaje;

    @Column(name = "leido")
    private Boolean leido;

    @ManyToOne
    @JsonIgnoreProperties(value = "", allowSetters = true)
    private Usuarios usuario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sugerencias asunto(String asunto) {
        this.asunto = asunto;
        return this;
    }

    public String getAsunto() {
        return asunto;
    }

    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    public Sugerencias prioridad(String prioridad) {
        this.prioridad = prioridad;
        return this;
    }

    public String getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(String prioridad) {
        this.prioridad = prioridad;
    }


    public Sugerencias mensaje(String mensaje) {
        this.mensaje = mensaje;
        return this;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public Sugerencias leido(Boolean leido) {
        this.leido = leido;
        return this;
    }

    public Boolean getLeido() {
        return leido;
    }

    public void setLeido(Boolean leido) {
        this.leido = leido;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }
}
