import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmpleados } from 'app/shared/model/empleados.model';
import { EmpleadosService } from './empleados.service';

@Component({
  templateUrl: './empleados-delete-dialog.component.html',
})
export class EmpleadosDeleteDialogComponent {
  empleados?: IEmpleados;

  constructor(protected empleadosService: EmpleadosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.empleadosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('empleadosListModification');
      this.activeModal.close();
    });
  }
}
