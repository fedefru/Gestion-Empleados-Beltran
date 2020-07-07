import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoDocumentos } from 'app/shared/model/tipo-documentos.model';
import { TipoDocumentosService } from './tipo-documentos.service';

@Component({
  templateUrl: './tipo-documentos-delete-dialog.component.html',
})
export class TipoDocumentosDeleteDialogComponent {
  tipoDocumentos?: ITipoDocumentos;

  constructor(
    protected tipoDocumentosService: TipoDocumentosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoDocumentosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoDocumentosListModification');
      this.activeModal.close();
    });
  }
}
