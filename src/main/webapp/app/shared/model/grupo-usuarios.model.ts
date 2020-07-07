import { IUsuarios } from 'app/shared/model/usuarios.model';
import { IGrupos } from 'app/shared/model/grupos.model';

export interface IGrupoUsuarios {
  id?: number;
  nombre?: string;
  usuario?: IUsuarios;
  grupo?: IGrupos;
}

export class GrupoUsuarios implements IGrupoUsuarios {
  constructor(public id?: number, public nombre?: string, public usuario?: IUsuarios, public grupo?: IGrupos) {}
}
