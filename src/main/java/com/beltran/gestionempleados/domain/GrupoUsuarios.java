package com.beltran.gestionempleados.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A GrupoUsuarios.
 */
@Entity
@Table(name = "grupo_usuarios")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GrupoUsuarios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @ManyToOne
    @JsonIgnoreProperties(value = "grupoUsuarios", allowSetters = true)
    private Usuarios usuario;

    @ManyToOne
    @JsonIgnoreProperties(value = "grupoUsuarios", allowSetters = true)
    private Grupos grupo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public GrupoUsuarios nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public GrupoUsuarios usuario(Usuarios usuarios) {
        this.usuario = usuarios;
        return this;
    }

    public void setUsuario(Usuarios usuarios) {
        this.usuario = usuarios;
    }

    public Grupos getGrupo() {
        return grupo;
    }

    public GrupoUsuarios grupo(Grupos grupos) {
        this.grupo = grupos;
        return this;
    }

    public void setGrupo(Grupos grupos) {
        this.grupo = grupos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GrupoUsuarios)) {
            return false;
        }
        return id != null && id.equals(((GrupoUsuarios) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GrupoUsuarios{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
