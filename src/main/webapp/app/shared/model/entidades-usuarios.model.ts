import { IUsuarios } from 'app/shared/model/usuarios.model';
import { IEntidades } from 'app/shared/model/entidades.model';

export interface IEntidadesUsuarios {
  id?: number;
  valor?: string;
  usuario?: IUsuarios;
  entidad?: IEntidades;
}

export class EntidadesUsuarios implements IEntidadesUsuarios {
  constructor(public id?: number, public valor?: string, public usuario?: IUsuarios, public entidad?: IEntidades) {}
}
