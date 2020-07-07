import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContactoUsuarios } from 'app/shared/model/contacto-usuarios.model';
import { ContactoUsuariosService } from './contacto-usuarios.service';

@Component({
  templateUrl: './contacto-usuarios-delete-dialog.component.html',
})
export class ContactoUsuariosDeleteDialogComponent {
  contactoUsuarios?: IContactoUsuarios;

  constructor(
    protected contactoUsuariosService: ContactoUsuariosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contactoUsuariosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contactoUsuariosListModification');
      this.activeModal.close();
    });
  }
}
