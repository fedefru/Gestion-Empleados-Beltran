import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGrupoUsuarios } from 'app/shared/model/grupo-usuarios.model';
import { GrupoUsuariosService } from './grupo-usuarios.service';

@Component({
  templateUrl: './grupo-usuarios-delete-dialog.component.html',
})
export class GrupoUsuariosDeleteDialogComponent {
  grupoUsuarios?: IGrupoUsuarios;

  constructor(
    protected grupoUsuariosService: GrupoUsuariosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.grupoUsuariosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('grupoUsuariosListModification');
      this.activeModal.close();
    });
  }
}
