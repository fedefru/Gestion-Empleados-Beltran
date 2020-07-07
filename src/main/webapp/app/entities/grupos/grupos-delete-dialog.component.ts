import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGrupos } from 'app/shared/model/grupos.model';
import { GruposService } from './grupos.service';

@Component({
  templateUrl: './grupos-delete-dialog.component.html',
})
export class GruposDeleteDialogComponent {
  grupos?: IGrupos;

  constructor(protected gruposService: GruposService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gruposService.delete(id).subscribe(() => {
      this.eventManager.broadcast('gruposListModification');
      this.activeModal.close();
    });
  }
}
