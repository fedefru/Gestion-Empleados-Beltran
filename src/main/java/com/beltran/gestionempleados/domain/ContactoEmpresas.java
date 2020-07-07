package com.beltran.gestionempleados.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ContactoEmpresas.
 */
@Entity
@Table(name = "contacto_empresas")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ContactoEmpresas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @ManyToOne
    @JsonIgnoreProperties(value = "contactoEmpresas", allowSetters = true)
    private TipoContactos contacto;

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

    public ContactoEmpresas nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoContactos getContacto() {
        return contacto;
    }

    public ContactoEmpresas contacto(TipoContactos tipoContactos) {
        this.contacto = tipoContactos;
        return this;
    }

    public void setContacto(TipoContactos tipoContactos) {
        this.contacto = tipoContactos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContactoEmpresas)) {
            return false;
        }
        return id != null && id.equals(((ContactoEmpresas) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContactoEmpresas{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
