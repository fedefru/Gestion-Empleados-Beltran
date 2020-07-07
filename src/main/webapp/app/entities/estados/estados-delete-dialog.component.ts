import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstados } from 'app/shared/model/estados.model';
import { EstadosService } from './estados.service';

@Component({
  templateUrl: './estados-delete-dialog.component.html',
})
export class EstadosDeleteDialogComponent {
  estados?: IEstados;

  constructor(protected estadosService: EstadosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('estadosListModification');
      this.activeModal.close();
    });
  }
}
