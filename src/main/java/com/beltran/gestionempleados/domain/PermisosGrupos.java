package com.beltran.gestionempleados.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PermisosGrupos.
 */
@Entity
@Table(name = "permisos_grupos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PermisosGrupos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @ManyToOne
    @JsonIgnoreProperties(value = "permisosGrupos", allowSetters = true)
    private Permisos permiso;

    @ManyToOne
    @JsonIgnoreProperties(value = "permisosGrupos", allowSetters = true)
    private Grupos grupos;

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

    public PermisosGrupos nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Permisos getPermiso() {
        return permiso;
    }

    public PermisosGrupos permiso(Permisos permisos) {
        this.permiso = permisos;
        return this;
    }

    public void setPermiso(Permisos permisos) {
        this.permiso = permisos;
    }

    public Grupos getGrupos() {
        return grupos;
    }

    public PermisosGrupos grupos(Grupos grupos) {
        this.grupos = grupos;
        return this;
    }

    public void setGrupos(Grupos grupos) {
        this.grupos = grupos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PermisosGrupos)) {
            return false;
        }
        return id != null && id.equals(((PermisosGrupos) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PermisosGrupos{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
