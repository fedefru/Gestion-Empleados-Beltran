import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntidades } from 'app/shared/model/entidades.model';
import { EntidadesService } from './entidades.service';

@Component({
  templateUrl: './entidades-delete-dialog.component.html',
})
export class EntidadesDeleteDialogComponent {
  entidades?: IEntidades;

  constructor(protected entidadesService: EntidadesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entidadesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('entidadesListModification');
      this.activeModal.close();
    });
  }
}
