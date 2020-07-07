import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPermisos } from 'app/shared/model/permisos.model';
import { PermisosService } from './permisos.service';

@Component({
  templateUrl: './permisos-delete-dialog.component.html',
})
export class PermisosDeleteDialogComponent {
  permisos?: IPermisos;

  constructor(protected permisosService: PermisosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.permisosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('permisosListModification');
      this.activeModal.close();
    });
  }
}
