import { ITipoContactos } from 'app/shared/model/tipo-contactos.model';

export interface IContactoUsuarios {
  id?: number;
  nombre?: string;
  contacto?: ITipoContactos;
}

export class ContactoUsuarios implements IContactoUsuarios {
  constructor(public id?: number, public nombre?: string, public contacto?: ITipoContactos) {}
}
