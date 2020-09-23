package com.beltran.gestionempleados.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * A Fichajes.
 */
@Entity
@Table(name = "fichajes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Fichajes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fichaje")
    private String fichaje;

    @Column(name = "accion")
    private String accion;

    @Column(name = "ruta_imagen")
    private String rutaImagen;

    @ManyToOne
    @JsonIgnoreProperties(value = "", allowSetters = true)
    private Usuarios usuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Fichajes fichaje(String fichaje) {
        this.fichaje = fichaje;
        return this;
    }

    public String getFichaje() {
        return fichaje;
    }

    public void setFichaje(String fichaje) {
        this.fichaje = fichaje;
    }

    public String getAccion() {
        return accion;
    }

    public Fichajes accion(String accion) {
        this.accion = accion;
        return this;
    }

    public void setAccion(String accion) {
        this.accion = accion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here


    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }

    public String getRutaImagen() {
        return rutaImagen;
    }

    public void setRutaImagen(String rutaImagen) {
        this.rutaImagen = rutaImagen;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fichajes)) {
            return false;
        }
        return id != null && id.equals(((Fichajes) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Fichajes{" +
            "id=" + getId() +
            ", fichaje='" + getFichaje() + "'" +
            ", accion='" + getAccion() + "'" +
            "}";
    }
}
