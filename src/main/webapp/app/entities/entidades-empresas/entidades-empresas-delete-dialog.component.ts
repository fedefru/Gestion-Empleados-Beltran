import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntidadesEmpresas } from 'app/shared/model/entidades-empresas.model';
import { EntidadesEmpresasService } from './entidades-empresas.service';

@Component({
  templateUrl: './entidades-empresas-delete-dialog.component.html',
})
export class EntidadesEmpresasDeleteDialogComponent {
  entidadesEmpresas?: IEntidadesEmpresas;

  constructor(
    protected entidadesEmpresasService: EntidadesEmpresasService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entidadesEmpresasService.delete(id).subscribe(() => {
      this.eventManager.broadcast('entidadesEmpresasListModification');
      this.activeModal.close();
    });
  }
}
