package com.beltran.gestionempleados.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A EntidadesEmpresas.
 */
@Entity
@Table(name = "entidades_empresas")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class EntidadesEmpresas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valor")
    private String valor;

    @ManyToOne
    @JsonIgnoreProperties(value = "entidadesEmpresas", allowSetters = true)
    private Empresas empresa;

    @ManyToOne
    @JsonIgnoreProperties(value = "entidadesEmpresas", allowSetters = true)
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

    public EntidadesEmpresas valor(String valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public Empresas getEmpresa() {
        return empresa;
    }

    public EntidadesEmpresas empresa(Empresas empresas) {
        this.empresa = empresas;
        return this;
    }

    public void setEmpresa(Empresas empresas) {
        this.empresa = empresas;
    }

    public Entidades getEntidad() {
        return entidad;
    }

    public EntidadesEmpresas entidad(Entidades entidades) {
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
        if (!(o instanceof EntidadesEmpresas)) {
            return false;
        }
        return id != null && id.equals(((EntidadesEmpresas) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntidadesEmpresas{" +
            "id=" + getId() +
            ", valor='" + getValor() + "'" +
            "}";
    }
}
