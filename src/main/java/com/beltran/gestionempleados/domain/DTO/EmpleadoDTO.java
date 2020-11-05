package com.beltran.gestionempleados.domain.DTO;

import com.beltran.gestionempleados.domain.Empleados;
import com.beltran.gestionempleados.domain.Usuarios;

public class EmpleadoDTO {

    private Empleados empleado;
    private Usuarios usuarios;

    public EmpleadoDTO() {
    }

    public Empleados getEmpleado() {
        return empleado;
    }

    public void setEmpleado(Empleados empleado) {
        this.empleado = empleado;
    }

    public Usuarios getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Usuarios usuarios) {
        this.usuarios = usuarios;
    }

    @Override
    public String toString() {
        return "EmpleadoDTO{" +
            "empleado=" + empleado +
            ", usuarios=" + usuarios +
            '}';
    }
}
