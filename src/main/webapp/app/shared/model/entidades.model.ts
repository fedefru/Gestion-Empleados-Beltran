export interface IEntidades {
  id?: number;
  nombre?: string;
  comentario?: string;
}

export class Entidades implements IEntidades {
  constructor(public id?: number, public nombre?: string, public comentario?: string) {}
}
