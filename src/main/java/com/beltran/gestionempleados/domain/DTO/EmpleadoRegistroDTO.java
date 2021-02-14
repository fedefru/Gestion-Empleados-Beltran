package com.beltran.gestionempleados.domain.DTO;

import com.beltran.gestionempleados.domain.Direcciones;
import com.beltran.gestionempleados.domain.Empleados;
import com.beltran.gestionempleados.domain.Paises;
import com.beltran.gestionempleados.domain.Provincias;

public class EmpleadoRegistroDTO {

    private Empleados empleados;
    private Direcciones direcciones;
    private Paises paises;
    private Provincias provincias;

    public EmpleadoRegistroDTO() {
    }

    public Empleados getEmpleados() {
        return empleados;
    }

    public void setEmpleados(Empleados empleados) {
        this.empleados = empleados;
    }

    public Direcciones getDirecciones() {
        return direcciones;
    }

    public void setDirecciones(Direcciones direcciones) {
        this.direcciones = direcciones;
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

    @Override
    public String toString() {
        return "EmpleadoRegistroDTO{" +
            "empleados=" + empleados +
            ", direcciones=" + direcciones +
            ", paises=" + paises +
            ", provincias=" + provincias +
            '}';
    }
}
