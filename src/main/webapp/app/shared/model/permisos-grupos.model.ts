import { IPermisos } from 'app/shared/model/permisos.model';
import { IGrupos } from 'app/shared/model/grupos.model';

export interface IPermisosGrupos {
  id?: number;
  nombre?: string;
  permiso?: IPermisos;
  grupos?: IGrupos;
}

export class PermisosGrupos implements IPermisosGrupos {
  constructor(public id?: number, public nombre?: string, public permiso?: IPermisos, public grupos?: IGrupos) {}
}
