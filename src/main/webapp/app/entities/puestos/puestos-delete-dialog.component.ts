import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPuestos } from 'app/shared/model/puestos.model';
import { PuestosService } from './puestos.service';

@Component({
  templateUrl: './puestos-delete-dialog.component.html',
})
export class PuestosDeleteDialogComponent {
  puestos?: IPuestos;

  constructor(protected puestosService: PuestosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.puestosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('puestosListModification');
      this.activeModal.close();
    });
  }
}
