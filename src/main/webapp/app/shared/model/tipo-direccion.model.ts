import { IDirecciones } from 'app/shared/model/direcciones.model';

export interface ITipoDireccion {
  id?: number;
  descripcion?: string;
  direccion?: IDirecciones;
}

export class TipoDireccion implements ITipoDireccion {
  constructor(public id?: number, public descripcion?: string, public direccion?: IDirecciones) {}
}
