export interface IAreas {
  id?: number;
  nombre?: string;
  codSector?: string;
  activo?: boolean;
}

export class Areas implements IAreas {
  constructor(public id?: number, public nombre?: string, public codSector?: string, public activo?: boolean) {
    this.activo = this.activo || false;
  }
}
