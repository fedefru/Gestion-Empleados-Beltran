import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFichajes } from 'app/shared/model/fichajes.model';
import { FichajesService } from './fichajes.service';

@Component({
  templateUrl: './fichajes-delete-dialog.component.html',
})
export class FichajesDeleteDialogComponent {
  fichajes?: IFichajes;

  constructor(protected fichajesService: FichajesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fichajesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fichajesListModification');
      this.activeModal.close();
    });
  }
}
