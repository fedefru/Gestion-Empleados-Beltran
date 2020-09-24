import { IUsuarios } from './usuarios.model';

export interface IFichajes {
  id?: number;
  fichaje?: string;
  accion?: string;
  rutaImagen?: string;
  usuario?: IUsuarios;
}

export class Fichajes implements IFichajes {
  constructor(
    public id?: number,
    public fichaje?: string,
    public accion?: string,
    public rutaImagen?: string,
    public usuario?: IUsuarios
  ) {}
}
