export interface IEstados {
  id?: number;
  nombre?: string;
}

export class Estados implements IEstados {
  constructor(public id?: number, public nombre?: string) {}
}
