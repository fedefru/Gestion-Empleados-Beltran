import { IEmpleados } from '../../../app/shared/model/empleados.model';
import { IDirecciones } from '../../../app/shared/model/direcciones.model';
import { IPaises } from './paises.model';
import { IProvincias } from './provincias.model';

export interface IEmpleadoRegistroDto {
  empleados?: IEmpleados;
  direcciones?: IDirecciones;
  paises?: IPaises;
  provincias?: IProvincias;
}

export class EmpleadoRegistroDto implements IEmpleadoRegistroDto {
  constructor(public empleados?: IEmpleados, public direcciones?: IDirecciones, public paises?: IPaises, public provincias?: IProvincias) {}
}
