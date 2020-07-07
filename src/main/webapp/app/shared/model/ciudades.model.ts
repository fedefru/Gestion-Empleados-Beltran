import { IProvincias } from 'app/shared/model/provincias.model';

export interface ICiudades {
  id?: number;
  nombre?: string;
  provicia?: IProvincias;
}

export class Ciudades implements ICiudades {
  constructor(public id?: number, public nombre?: string, public provicia?: IProvincias) {}
}
