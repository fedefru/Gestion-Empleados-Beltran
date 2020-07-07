import { ITipoContactos } from 'app/shared/model/tipo-contactos.model';

export interface IContactoEmpresas {
  id?: number;
  nombre?: string;
  contacto?: ITipoContactos;
}

export class ContactoEmpresas implements IContactoEmpresas {
  constructor(public id?: number, public nombre?: string, public contacto?: ITipoContactos) {}
}
