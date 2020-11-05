import { IEmpleados } from '../model/empleados.model';
import { IUsuarios } from '../model/usuarios.model';

export interface IEmpleadoDTO {
  empleado?: IEmpleados;
  usuario?: IUsuarios;
}

export class EmpleadoDto implements IEmpleadoDTO {
  constructor(public empleado?: IEmpleados, public usuario?: IUsuarios) {}
}
