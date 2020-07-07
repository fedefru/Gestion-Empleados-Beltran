package com.beltran.gestionempleados.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A EntidadesUsuarios.
 */
@Entity
@Table(name = "entidades_usuarios")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class EntidadesUsuarios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valor")
    private String valor;

    @ManyToOne
    @JsonIgnoreProperties(value = "entidadesUsuarios", allowSetters = true)
    private Usuarios usuario;

    @ManyToOne
    @JsonIgnoreProperties(value = "entidadesUsuarios", allowSetters = true)
    private Entidades entidad;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValor() {
        return valor;
    }

    public EntidadesUsuarios valor(String valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public EntidadesUsuarios usuario(Usuarios usuarios) {
        this.usuario = usuarios;
        return this;
    }

    public void setUsuario(Usuarios usuarios) {
        this.usuario = usuarios;
    }

    public Entidades getEntidad() {
        return entidad;
    }

    public EntidadesUsuarios entidad(Entidades entidades) {
        this.entidad = entidades;
        return this;
    }

    public void setEntidad(Entidades entidades) {
        this.entidad = entidades;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntidadesUsuarios)) {
            return false;
        }
        return id != null && id.equals(((EntidadesUsuarios) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntidadesUsuarios{" +
            "id=" + getId() +
            ", valor='" + getValor() + "'" +
            "}";
    }
}
