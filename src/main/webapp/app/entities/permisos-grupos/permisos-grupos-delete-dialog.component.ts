import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPermisosGrupos } from 'app/shared/model/permisos-grupos.model';
import { PermisosGruposService } from './permisos-grupos.service';

@Component({
  templateUrl: './permisos-grupos-delete-dialog.component.html',
})
export class PermisosGruposDeleteDialogComponent {
  permisosGrupos?: IPermisosGrupos;

  constructor(
    protected permisosGruposService: PermisosGruposService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.permisosGruposService.delete(id).subscribe(() => {
      this.eventManager.broadcast('permisosGruposListModification');
      this.activeModal.close();
    });
  }
}
