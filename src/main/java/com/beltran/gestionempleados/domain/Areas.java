package com.beltran.gestionempleados.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Areas.
 */
@Entity
@Table(name = "areas")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Areas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "cod_sector")
    private String codSector;

    @Column(name = "activo")
    private Boolean activo;

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

    public Areas nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodSector() {
        return codSector;
    }

    public Areas codSector(String codSector) {
        this.codSector = codSector;
        return this;
    }

    public void setCodSector(String codSector) {
        this.codSector = codSector;
    }

    public Boolean isActivo() {
        return activo;
    }

    public Areas activo(Boolean activo) {
        this.activo = activo;
        return this;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Areas)) {
            return false;
        }
        return id != null && id.equals(((Areas) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Areas{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", codSector='" + getCodSector() + "'" +
            ", activo='" + isActivo() + "'" +
            "}";
    }
}
