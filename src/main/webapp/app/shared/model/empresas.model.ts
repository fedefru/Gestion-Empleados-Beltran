import { ITipoDireccion } from 'app/shared/model/tipo-direccion.model';
import { ITipoContactos } from 'app/shared/model/tipo-contactos.model';
import { IEstados } from 'app/shared/model/estados.model';

export interface IEmpresas {
  id?: number;
  nombre?: string;
  direccion?: ITipoDireccion;
  contacto?: ITipoContactos;
  estado?: IEstados;
}

export class Empresas implements IEmpresas {
  constructor(
    public id?: number,
    public nombre?: string,
    public direccion?: ITipoDireccion,
    public contacto?: ITipoContactos,
    public estado?: IEstados
  ) {}
}
