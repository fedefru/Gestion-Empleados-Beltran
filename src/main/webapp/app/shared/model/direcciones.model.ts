import { ICiudades } from 'app/shared/model/ciudades.model';

export interface IDirecciones {
  id?: number;
  calle?: string;
  altura?: number;
  piso?: number;
  departamento?: string;
  ciudad?: ICiudades;
}

export class Direcciones implements IDirecciones {
  constructor(
    public id?: number,
    public calle?: string,
    public altura?: number,
    public piso?: number,
    public departamento?: string,
    public ciudad?: ICiudades
  ) {}
}
