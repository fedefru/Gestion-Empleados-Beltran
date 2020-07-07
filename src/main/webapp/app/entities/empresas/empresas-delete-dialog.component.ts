import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmpresas } from 'app/shared/model/empresas.model';
import { EmpresasService } from './empresas.service';

@Component({
  templateUrl: './empresas-delete-dialog.component.html',
})
export class EmpresasDeleteDialogComponent {
  empresas?: IEmpresas;

  constructor(protected empresasService: EmpresasService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.empresasService.delete(id).subscribe(() => {
      this.eventManager.broadcast('empresasListModification');
      this.activeModal.close();
    });
  }
}
