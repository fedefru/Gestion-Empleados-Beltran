import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoDireccion } from 'app/shared/model/tipo-direccion.model';
import { TipoDireccionService } from './tipo-direccion.service';

@Component({
  templateUrl: './tipo-direccion-delete-dialog.component.html',
})
export class TipoDireccionDeleteDialogComponent {
  tipoDireccion?: ITipoDireccion;

  constructor(
    protected tipoDireccionService: TipoDireccionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoDireccionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoDireccionListModification');
      this.activeModal.close();
    });
  }
}
