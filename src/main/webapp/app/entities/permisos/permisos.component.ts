import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPermisos } from 'app/shared/model/permisos.model';
import { PermisosService } from './permisos.service';
import { PermisosDeleteDialogComponent } from './permisos-delete-dialog.component';

@Component({
  selector: 'jhi-permisos',
  templateUrl: './permisos.component.html',
})
export class PermisosComponent implements OnInit, OnDestroy {
  permisos?: IPermisos[];
  eventSubscriber?: Subscription;

  constructor(protected permisosService: PermisosService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.permisosService.query().subscribe((res: HttpResponse<IPermisos[]>) => (this.permisos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPermisos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPermisos): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPermisos(): void {
    this.eventSubscriber = this.eventManager.subscribe('permisosListModification', () => this.loadAll());
  }

  delete(permisos: IPermisos): void {
    const modalRef = this.modalService.open(PermisosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.permisos = permisos;
  }
}
