package com.beltran.gestionempleados.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Direcciones.
 */
@Entity
@Table(name = "direcciones")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Direcciones implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "calle")
    private String calle;

    @Column(name = "altura")
    private Integer altura;

    @Column(name = "piso")
    private Integer piso;

    @Column(name = "departamento")
    private String departamento;

    @ManyToOne
    @JsonIgnoreProperties(value = "direcciones", allowSetters = true)
    private Ciudades ciudad;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCalle() {
        return calle;
    }

    public Direcciones calle(String calle) {
        this.calle = calle;
        return this;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public Integer getAltura() {
        return altura;
    }

    public Direcciones altura(Integer altura) {
        this.altura = altura;
        return this;
    }

    public void setAltura(Integer altura) {
        this.altura = altura;
    }

    public Integer getPiso() {
        return piso;
    }

    public Direcciones piso(Integer piso) {
        this.piso = piso;
        return this;
    }

    public void setPiso(Integer piso) {
        this.piso = piso;
    }

    public String getDepartamento() {
        return departamento;
    }

    public Direcciones departamento(String departamento) {
        this.departamento = departamento;
        return this;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public Ciudades getCiudad() {
        return ciudad;
    }

    public Direcciones ciudad(Ciudades ciudades) {
        this.ciudad = ciudades;
        return this;
    }

    public void setCiudad(Ciudades ciudades) {
        this.ciudad = ciudades;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Direcciones)) {
            return false;
        }
        return id != null && id.equals(((Direcciones) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Direcciones{" +
            "id=" + getId() +
            ", calle='" + getCalle() + "'" +
            ", altura=" + getAltura() +
            ", piso=" + getPiso() +
            ", departamento='" + getDepartamento() + "'" +
            "}";
    }
}
