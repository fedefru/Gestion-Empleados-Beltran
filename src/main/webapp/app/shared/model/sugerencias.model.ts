import { IUsuarios } from './usuarios.model';

export interface ISugerencias {
  id?: number;
  asunto?: string;
  prioridad?: string;
  mensaje?: string;
  leido?: boolean;
  likes?: number;
  usuario?: IUsuarios;
}

export class Sugerencias implements ISugerencias {
  constructor(
    public id?: number,
    public asunto?: string,
    public prioridad?: string,
    public mensaje?: string,
    public leido?: boolean,
    public likes?: number,
    public usuario?: IUsuarios
  ) {}
}
