import { Moment } from 'moment';
import { IEstados } from 'app/shared/model/estados.model';
import { ITipoDireccion } from 'app/shared/model/tipo-direccion.model';
import { ITipoContactos } from 'app/shared/model/tipo-contactos.model';

export interface IUsuarios {
  id?: number;
  nombre?: string;
  apellido?: string;
  fechaNac?: Moment;
  clave?: string;
  usuario?: string;
  estado?: IEstados;
  direccion?: ITipoDireccion;
  contacto?: ITipoContactos;
}

export class Usuarios implements IUsuarios {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellido?: string,
    public fechaNac?: Moment,
    public clave?: string,
    public usuario?: string,
    public estado?: IEstados,
    public direccion?: ITipoDireccion,
    public contacto?: ITipoContactos
  ) {}
}
