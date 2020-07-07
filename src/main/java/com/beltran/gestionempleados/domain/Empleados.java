package com.beltran.gestionempleados.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Empleados.
 */
@Entity
@Table(name = "empleados")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Empleados implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_ingreso")
    private LocalDate fechaIngreso;

    @ManyToOne
    @JsonIgnoreProperties(value = "empleados", allowSetters = true)
    private Empleados jefe;

    @ManyToOne
    @JsonIgnoreProperties(value = "empleados", allowSetters = true)
    private Usuarios usuario;

    @ManyToOne
    @JsonIgnoreProperties(value = "empleados", allowSetters = true)
    private Estados estado;

    @ManyToOne
    @JsonIgnoreProperties(value = "empleados", allowSetters = true)
    private Areas area;

    @ManyToOne
    @JsonIgnoreProperties(value = "empleados", allowSetters = true)
    private Puestos puesto;

    @ManyToOne
    @JsonIgnoreProperties(value = "empleados", allowSetters = true)
    private Fichajes fichaje;

    @ManyToOne
    @JsonIgnoreProperties(value = "empleados", allowSetters = true)
    private Empresas empresa;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    public Empleados fechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
        return this;
    }

    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Empleados getJefe() {
        return jefe;
    }

    public Empleados jefe(Empleados empleados) {
        this.jefe = empleados;
        return this;
    }

    public void setJefe(Empleados empleados) {
        this.jefe = empleados;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public Empleados usuario(Usuarios usuarios) {
        this.usuario = usuarios;
        return this;
    }

    public void setUsuario(Usuarios usuarios) {
        this.usuario = usuarios;
    }

    public Estados getEstado() {
        return estado;
    }

    public Empleados estado(Estados estados) {
        this.estado = estados;
        return this;
    }

    public void setEstado(Estados estados) {
        this.estado = estados;
    }

    public Areas getArea() {
        return area;
    }

    public Empleados area(Areas areas) {
        this.area = areas;
        return this;
    }

    public void setArea(Areas areas) {
        this.area = areas;
    }

    public Puestos getPuesto() {
        return puesto;
    }

    public Empleados puesto(Puestos puestos) {
        this.puesto = puestos;
        return this;
    }

    public void setPuesto(Puestos puestos) {
        this.puesto = puestos;
    }

    public Fichajes getFichaje() {
        return fichaje;
    }

    public Empleados fichaje(Fichajes fichajes) {
        this.fichaje = fichajes;
        return this;
    }

    public void setFichaje(Fichajes fichajes) {
        this.fichaje = fichajes;
    }

    public Empresas getEmpresa() {
        return empresa;
    }

    public Empleados empresa(Empresas empresas) {
        this.empresa = empresas;
        return this;
    }

    public void setEmpresa(Empresas empresas) {
        this.empresa = empresas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empleados)) {
            return false;
        }
        return id != null && id.equals(((Empleados) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Empleados{" +
            "id=" + getId() +
            ", fechaIngreso='" + getFechaIngreso() + "'" +
            "}";
    }
}
