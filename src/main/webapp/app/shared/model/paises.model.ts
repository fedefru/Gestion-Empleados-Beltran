export interface IPaises {
  id?: number;
  nombre?: string;
}

export class Paises implements IPaises {
  constructor(public id?: number, public nombre?: string) {}
}
