import { Moment } from 'moment';

export interface IFichajes {
  id?: number;
  fichaje?: Moment;
  accion?: string;
}

export class Fichajes implements IFichajes {
  constructor(public id?: number, public fichaje?: Moment, public accion?: string) {}
}
