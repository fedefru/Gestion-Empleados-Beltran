import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContactoEmpresas } from 'app/shared/model/contacto-empresas.model';
import { ContactoEmpresasService } from './contacto-empresas.service';

@Component({
  templateUrl: './contacto-empresas-delete-dialog.component.html',
})
export class ContactoEmpresasDeleteDialogComponent {
  contactoEmpresas?: IContactoEmpresas;

  constructor(
    protected contactoEmpresasService: ContactoEmpresasService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contactoEmpresasService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contactoEmpresasListModification');
      this.activeModal.close();
    });
  }
}
