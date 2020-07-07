import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUsuarios } from 'app/shared/model/usuarios.model';
import { UsuariosService } from './usuarios.service';

@Component({
  templateUrl: './usuarios-delete-dialog.component.html',
})
export class UsuariosDeleteDialogComponent {
  usuarios?: IUsuarios;

  constructor(protected usuariosService: UsuariosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.usuariosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('usuariosListModification');
      this.activeModal.close();
    });
  }
}
