export interface IPermisos {
  id?: number;
  nombre?: string;
  descripcion?: string;
}

export class Permisos implements IPermisos {
  constructor(public id?: number, public nombre?: string, public descripcion?: string) {}
}
