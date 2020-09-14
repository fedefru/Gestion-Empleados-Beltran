import { Moment } from 'moment';
import { IUsuarios } from './usuarios.model';

export interface IFichajes {
  id?: number;
  fichaje?: Moment;
  accion?: string;
  usuario?: IUsuarios;
}

export class Fichajes implements IFichajes {
  constructor(public id?: number, public fichaje?: Moment, public accion?: string, public usuario?: IUsuarios) {}
}
