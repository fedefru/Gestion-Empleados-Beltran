import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConfiguraciones } from 'app/shared/model/configuraciones.model';
import { ConfiguracionesService } from './configuraciones.service';

@Component({
  templateUrl: './configuraciones-delete-dialog.component.html',
})
export class ConfiguracionesDeleteDialogComponent {
  configuraciones?: IConfiguraciones;

  constructor(
    protected configuracionesService: ConfiguracionesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.configuracionesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('configuracionesListModification');
      this.activeModal.close();
    });
  }
}
