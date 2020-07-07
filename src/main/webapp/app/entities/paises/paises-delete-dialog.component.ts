import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaises } from 'app/shared/model/paises.model';
import { PaisesService } from './paises.service';

@Component({
  templateUrl: './paises-delete-dialog.component.html',
})
export class PaisesDeleteDialogComponent {
  paises?: IPaises;

  constructor(protected paisesService: PaisesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paisesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paisesListModification');
      this.activeModal.close();
    });
  }
}
