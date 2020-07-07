import { Moment } from 'moment';
import { IUsuarios } from 'app/shared/model/usuarios.model';
import { IEstados } from 'app/shared/model/estados.model';
import { IAreas } from 'app/shared/model/areas.model';
import { IPuestos } from 'app/shared/model/puestos.model';
import { IFichajes } from 'app/shared/model/fichajes.model';
import { IEmpresas } from 'app/shared/model/empresas.model';

export interface IEmpleados {
  id?: number;
  fechaIngreso?: Moment;
  jefe?: IEmpleados;
  usuario?: IUsuarios;
  estado?: IEstados;
  area?: IAreas;
  puesto?: IPuestos;
  fichaje?: IFichajes;
  empresa?: IEmpresas;
}

export class Empleados implements IEmpleados {
  constructor(
    public id?: number,
    public fechaIngreso?: Moment,
    public jefe?: IEmpleados,
    public usuario?: IUsuarios,
    public estado?: IEstados,
    public area?: IAreas,
    public puesto?: IPuestos,
    public fichaje?: IFichajes,
    public empresa?: IEmpresas
  ) {}
}
