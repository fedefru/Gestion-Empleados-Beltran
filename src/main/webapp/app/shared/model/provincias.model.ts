import { IPaises } from 'app/shared/model/paises.model';

export interface IProvincias {
  id?: number;
  nombre?: string;
  pais?: IPaises;
}

export class Provincias implements IProvincias {
  constructor(public id?: number, public nombre?: string, public pais?: IPaises) {}
}
