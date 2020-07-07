package com.beltran.gestionempleados.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TipoContactos.
 */
@Entity
@Table(name = "tipo_contactos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TipoContactos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne
    @JsonIgnoreProperties(value = "tipoContactos", allowSetters = true)
    private TipoDocumentos tipoDocumento;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public TipoContactos descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public TipoDocumentos getTipoDocumento() {
        return tipoDocumento;
    }

    public TipoContactos tipoDocumento(TipoDocumentos tipoDocumentos) {
        this.tipoDocumento = tipoDocumentos;
        return this;
    }

    public void setTipoDocumento(TipoDocumentos tipoDocumentos) {
        this.tipoDocumento = tipoDocumentos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoContactos)) {
            return false;
        }
        return id != null && id.equals(((TipoContactos) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoContactos{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
