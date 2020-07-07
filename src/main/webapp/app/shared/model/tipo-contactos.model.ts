import { ITipoDocumentos } from 'app/shared/model/tipo-documentos.model';

export interface ITipoContactos {
  id?: number;
  descripcion?: string;
  tipoDocumento?: ITipoDocumentos;
}

export class TipoContactos implements ITipoContactos {
  constructor(public id?: number, public descripcion?: string, public tipoDocumento?: ITipoDocumentos) {}
}
