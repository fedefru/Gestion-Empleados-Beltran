export interface IGrupos {
  id?: number;
  nombre?: string;
  descripcion?: string;
}

export class Grupos implements IGrupos {
  constructor(public id?: number, public nombre?: string, public descripcion?: string) {}
}
