export interface IOrganigrama {
  key?: number;
  name?: string;
  title?: string;
  parent?: number;
}

export class Organigrama implements IOrganigrama {
  constructor(public key?: number, public name?: string, public title?: string, public parent?: number) {}
}
