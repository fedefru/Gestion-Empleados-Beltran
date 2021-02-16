package com.beltran.gestionempleados.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Empresas.
 */
@Entity
@Table(name = "empresas")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Empresas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "usuario")
    private String usuario;

    @Column(name = "clave")
    private String clave;

    @ManyToOne
    @JsonIgnoreProperties(value = "empresas", allowSetters = true)
    private TipoDireccion direccion;

    @ManyToOne
    @JsonIgnoreProperties(value = "empresas", allowSetters = true)
    private TipoContactos contacto;

    @ManyToOne
    @JsonIgnoreProperties(value = "empresas", allowSetters = true)
    private Estados estado;


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

    public Empresas nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUsuario() {
        return usuario;
    }

    public Empresas usuario(String usuario) {
        this.usuario = usuario;
        return this;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getClave() {
        return clave;
    }

    public Empresas clave(String clave) {
        this.clave = clave;
        return this;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public TipoDireccion getDireccion() {
        return direccion;
    }

    public Empresas direccion(TipoDireccion tipoDireccion) {
        this.direccion = tipoDireccion;
        return this;
    }

    public void setDireccion(TipoDireccion tipoDireccion) {
        this.direccion = tipoDireccion;
    }

    public TipoContactos getContacto() {
        return contacto;
    }

    public Empresas contacto(TipoContactos tipoContactos) {
        this.contacto = tipoContactos;
        return this;
    }

    public void setContacto(TipoContactos tipoContactos) {
        this.contacto = tipoContactos;
    }

    public Estados getEstado() {
        return estado;
    }

    public Empresas estado(Estados estados) {
        this.estado = estados;
        return this;
    }

    public void setEstado(Estados estados) {
        this.estado = estados;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empresas)) {
            return false;
        }
        return id != null && id.equals(((Empresas) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Empresas{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
