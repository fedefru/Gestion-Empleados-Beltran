export interface ITipoDocumentos {
  id?: number;
  tipo?: string;
}

export class TipoDocumentos implements ITipoDocumentos {
  constructor(public id?: number, public tipo?: string) {}
}
