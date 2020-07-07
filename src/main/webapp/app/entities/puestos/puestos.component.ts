import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPuestos } from 'app/shared/model/puestos.model';
import { PuestosService } from './puestos.service';
import { PuestosDeleteDialogComponent } from './puestos-delete-dialog.component';

@Component({
  selector: 'jhi-puestos',
  templateUrl: './puestos.component.html',
})
export class PuestosComponent implements OnInit, OnDestroy {
  puestos?: IPuestos[];
  eventSubscriber?: Subscription;

  constructor(protected puestosService: PuestosService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.puestosService.query().subscribe((res: HttpResponse<IPuestos[]>) => (this.puestos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPuestos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPuestos): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPuestos(): void {
    this.eventSubscriber = this.eventManager.subscribe('puestosListModification', () => this.loadAll());
  }

  delete(puestos: IPuestos): void {
    const modalRef = this.modalService.open(PuestosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.puestos = puestos;
  }
}
