import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDirecciones } from 'app/shared/model/direcciones.model';
import { DireccionesService } from './direcciones.service';

@Component({
  templateUrl: './direcciones-delete-dialog.component.html',
})
export class DireccionesDeleteDialogComponent {
  direcciones?: IDirecciones;

  constructor(
    protected direccionesService: DireccionesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.direccionesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('direccionesListModification');
      this.activeModal.close();
    });
  }
}
