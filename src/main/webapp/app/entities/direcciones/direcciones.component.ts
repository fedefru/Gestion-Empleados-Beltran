import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDirecciones } from 'app/shared/model/direcciones.model';
import { DireccionesService } from './direcciones.service';
import { DireccionesDeleteDialogComponent } from './direcciones-delete-dialog.component';

@Component({
  selector: 'jhi-direcciones',
  templateUrl: './direcciones.component.html',
})
export class DireccionesComponent implements OnInit, OnDestroy {
  direcciones?: IDirecciones[];
  eventSubscriber?: Subscription;

  constructor(
    protected direccionesService: DireccionesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.direccionesService.query().subscribe((res: HttpResponse<IDirecciones[]>) => (this.direcciones = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDirecciones();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDirecciones): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDirecciones(): void {
    this.eventSubscriber = this.eventManager.subscribe('direccionesListModification', () => this.loadAll());
  }

  delete(direcciones: IDirecciones): void {
    const modalRef = this.modalService.open(DireccionesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.direcciones = direcciones;
  }
}
