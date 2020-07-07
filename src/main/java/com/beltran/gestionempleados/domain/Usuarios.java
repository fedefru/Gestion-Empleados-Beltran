package com.beltran.gestionempleados.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Usuarios.
 */
@Entity
@Table(name = "usuarios")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Usuarios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "fecha_nac")
    private LocalDate fechaNac;

    @Column(name = "clave")
    private String clave;

    @Column(name = "usuario")
    private String usuario;

    @ManyToOne
    @JsonIgnoreProperties(value = "usuarios", allowSetters = true)
    private Estados estado;

    @ManyToOne
    @JsonIgnoreProperties(value = "usuarios", allowSetters = true)
    private TipoDireccion direccion;

    @ManyToOne
    @JsonIgnoreProperties(value = "usuarios", allowSetters = true)
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

    public Usuarios nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public Usuarios apellido(String apellido) {
        this.apellido = apellido;
        return this;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public LocalDate getFechaNac() {
        return fechaNac;
    }

    public Usuarios fechaNac(LocalDate fechaNac) {
        this.fechaNac = fechaNac;
        return this;
    }

    public void setFechaNac(LocalDate fechaNac) {
        this.fechaNac = fechaNac;
    }

    public String getClave() {
        return clave;
    }

    public Usuarios clave(String clave) {
        this.clave = clave;
        return this;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getUsuario() {
        return usuario;
    }

    public Usuarios usuario(String usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Estados getEstado() {
        return estado;
    }

    public Usuarios estado(Estados estados) {
        this.estado = estados;
        return this;
    }

    public void setEstado(Estados estados) {
        this.estado = estados;
    }

    public TipoDireccion getDireccion() {
        return direccion;
    }

    public Usuarios direccion(TipoDireccion tipoDireccion) {
        this.direccion = tipoDireccion;
        return this;
    }

    public void setDireccion(TipoDireccion tipoDireccion) {
        this.direccion = tipoDireccion;
    }

    public TipoContactos getContacto() {
        return contacto;
    }

    public Usuarios contacto(TipoContactos tipoContactos) {
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
        if (!(o instanceof Usuarios)) {
            return false;
        }
        return id != null && id.equals(((Usuarios) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Usuarios{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", apellido='" + getApellido() + "'" +
            ", fechaNac='" + getFechaNac() + "'" +
            ", clave='" + getClave() + "'" +
            ", usuario='" + getUsuario() + "'" +
            "}";
    }
}
