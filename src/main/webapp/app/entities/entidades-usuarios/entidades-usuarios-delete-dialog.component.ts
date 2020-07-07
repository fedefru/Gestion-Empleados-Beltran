import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntidadesUsuarios } from 'app/shared/model/entidades-usuarios.model';
import { EntidadesUsuariosService } from './entidades-usuarios.service';

@Component({
  templateUrl: './entidades-usuarios-delete-dialog.component.html',
})
export class EntidadesUsuariosDeleteDialogComponent {
  entidadesUsuarios?: IEntidadesUsuarios;

  constructor(
    protected entidadesUsuariosService: EntidadesUsuariosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entidadesUsuariosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('entidadesUsuariosListModification');
      this.activeModal.close();
    });
  }
}
