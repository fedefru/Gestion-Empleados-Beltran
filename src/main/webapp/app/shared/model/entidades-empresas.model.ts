import { IEmpresas } from 'app/shared/model/empresas.model';
import { IEntidades } from 'app/shared/model/entidades.model';

export interface IEntidadesEmpresas {
  id?: number;
  valor?: string;
  empresa?: IEmpresas;
  entidad?: IEntidades;
}

export class EntidadesEmpresas implements IEntidadesEmpresas {
  constructor(public id?: number, public valor?: string, public empresa?: IEmpresas, public entidad?: IEntidades) {}
}
