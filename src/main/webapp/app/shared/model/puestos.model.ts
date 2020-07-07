export interface IPuestos {
  id?: number;
  nombre?: string;
  activo?: boolean;
}

export class Puestos implements IPuestos {
  constructor(public id?: number, public nombre?: string, public activo?: boolean) {
    this.activo = this.activo || false;
  }
}
