import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoDireccion } from 'app/shared/model/tipo-direccion.model';
import { TipoDireccionService } from './tipo-direccion.service';
import { TipoDireccionDeleteDialogComponent } from './tipo-direccion-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-direccion',
  templateUrl: './tipo-direccion.component.html',
})
export class TipoDireccionComponent implements OnInit, OnDestroy {
  tipoDireccions?: ITipoDireccion[];
  eventSubscriber?: Subscription;

  constructor(
    protected tipoDireccionService: TipoDireccionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.tipoDireccionService.query().subscribe((res: HttpResponse<ITipoDireccion[]>) => (this.tipoDireccions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoDireccions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoDireccion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoDireccions(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoDireccionListModification', () => this.loadAll());
  }

  delete(tipoDireccion: ITipoDireccion): void {
    const modalRef = this.modalService.open(TipoDireccionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoDireccion = tipoDireccion;
  }
}
