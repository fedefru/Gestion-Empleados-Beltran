export interface IConfiguraciones {
  id?: number;
  clave?: string;
  valor?: string;
  detalle?: string;
}

export class Configuraciones implements IConfiguraciones {
  constructor(public id?: number, public clave?: string, public valor?: string, public detalle?: string) {}
}
