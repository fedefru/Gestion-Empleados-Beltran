import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoContactos } from 'app/shared/model/tipo-contactos.model';
import { TipoContactosService } from './tipo-contactos.service';

@Component({
  templateUrl: './tipo-contactos-delete-dialog.component.html',
})
export class TipoContactosDeleteDialogComponent {
  tipoContactos?: ITipoContactos;

  constructor(
    protected tipoContactosService: TipoContactosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoContactosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoContactosListModification');
      this.activeModal.close();
    });
  }
}
