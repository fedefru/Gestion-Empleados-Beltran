import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICiudades } from 'app/shared/model/ciudades.model';
import { CiudadesService } from './ciudades.service';

@Component({
  templateUrl: './ciudades-delete-dialog.component.html',
})
export class CiudadesDeleteDialogComponent {
  ciudades?: ICiudades;

  constructor(protected ciudadesService: CiudadesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ciudadesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ciudadesListModification');
      this.activeModal.close();
    });
  }
}
