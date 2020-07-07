import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstados } from 'app/shared/model/estados.model';
import { EstadosService } from './estados.service';
import { EstadosDeleteDialogComponent } from './estados-delete-dialog.component';

@Component({
  selector: 'jhi-estados',
  templateUrl: './estados.component.html',
})
export class EstadosComponent implements OnInit, OnDestroy {
  estados?: IEstados[];
  eventSubscriber?: Subscription;

  constructor(protected estadosService: EstadosService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.estadosService.query().subscribe((res: HttpResponse<IEstados[]>) => (this.estados = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEstados();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEstados): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEstados(): void {
    this.eventSubscriber = this.eventManager.subscribe('estadosListModification', () => this.loadAll());
  }

  delete(estados: IEstados): void {
    const modalRef = this.modalService.open(EstadosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estados = estados;
  }
}
