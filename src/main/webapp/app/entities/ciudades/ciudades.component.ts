import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICiudades } from 'app/shared/model/ciudades.model';
import { CiudadesService } from './ciudades.service';
import { CiudadesDeleteDialogComponent } from './ciudades-delete-dialog.component';

@Component({
  selector: 'jhi-ciudades',
  templateUrl: './ciudades.component.html',
})
export class CiudadesComponent implements OnInit, OnDestroy {
  ciudades?: ICiudades[];
  eventSubscriber?: Subscription;

  constructor(protected ciudadesService: CiudadesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.ciudadesService.query().subscribe((res: HttpResponse<ICiudades[]>) => (this.ciudades = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCiudades();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICiudades): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCiudades(): void {
    this.eventSubscriber = this.eventManager.subscribe('ciudadesListModification', () => this.loadAll());
  }

  delete(ciudades: ICiudades): void {
    const modalRef = this.modalService.open(CiudadesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ciudades = ciudades;
  }
}
