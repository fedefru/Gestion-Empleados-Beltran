package com.beltran.gestionempleados.domain.DTO;

import com.beltran.gestionempleados.domain.*;

public class EmpresaDTO {

    private String nombre;
    private String clave;
    private TipoContactos tipoContactos;
    private Paises paises;
    private Provincias provincias;
    private Ciudades ciudades;
    private Direcciones direcciones;
    private Empresas empresas;

    public EmpresaDTO() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public TipoContactos getTipoContactos() {
        return tipoContactos;
    }

    public void setTipoContactos(TipoContactos tipoContactos) {
        this.tipoContactos = tipoContactos;
    }

    public Paises getPaises() {
        return paises;
    }

    public void setPaises(Paises paises) {
        this.paises = paises;
    }

    public Provincias getProvincias() {
        return provincias;
    }

    public void setProvincias(Provincias provincias) {
        this.provincias = provincias;
    }

    public Ciudades getCiudades() {
        return ciudades;
    }

    public void setCiudades(Ciudades ciudades) {
        this.ciudades = ciudades;
    }

    public Direcciones getDirecciones() {
        return direcciones;
    }

    public void setDirecciones(Direcciones direcciones) {
        this.direcciones = direcciones;
    }

    public Empresas getEmpresas() {
        return empresas;
    }

    public void setEmpresas(Empresas empresas) {
        this.empresas = empresas;
    }
}
