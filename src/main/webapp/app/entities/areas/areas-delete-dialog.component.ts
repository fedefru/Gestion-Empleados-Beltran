import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAreas } from 'app/shared/model/areas.model';
import { AreasService } from './areas.service';

@Component({
  templateUrl: './areas-delete-dialog.component.html',
})
export class AreasDeleteDialogComponent {
  areas?: IAreas;

  constructor(protected areasService: AreasService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.areasService.delete(id).subscribe(() => {
      this.eventManager.broadcast('areasListModification');
      this.activeModal.close();
    });
  }
}
