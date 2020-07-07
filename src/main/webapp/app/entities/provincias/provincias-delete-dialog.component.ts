import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProvincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from './provincias.service';

@Component({
  templateUrl: './provincias-delete-dialog.component.html',
})
export class ProvinciasDeleteDialogComponent {
  provincias?: IProvincias;

  constructor(
    protected provinciasService: ProvinciasService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.provinciasService.delete(id).subscribe(() => {
      this.eventManager.broadcast('provinciasListModification');
      this.activeModal.close();
    });
  }
}
