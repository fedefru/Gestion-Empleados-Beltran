import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaises } from 'app/shared/model/paises.model';
import { PaisesService } from './paises.service';
import { PaisesDeleteDialogComponent } from './paises-delete-dialog.component';

@Component({
  selector: 'jhi-paises',
  templateUrl: './paises.component.html',
})
export class PaisesComponent implements OnInit, OnDestroy {
  paises?: IPaises[];
  eventSubscriber?: Subscription;

  constructor(protected paisesService: PaisesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.paisesService.query().subscribe((res: HttpResponse<IPaises[]>) => (this.paises = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPaises();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPaises): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPaises(): void {
    this.eventSubscriber = this.eventManager.subscribe('paisesListModification', () => this.loadAll());
  }

  delete(paises: IPaises): void {
    const modalRef = this.modalService.open(PaisesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paises = paises;
  }
}
