import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntidades } from 'app/shared/model/entidades.model';
import { EntidadesService } from './entidades.service';
import { EntidadesDeleteDialogComponent } from './entidades-delete-dialog.component';

@Component({
  selector: 'jhi-entidades',
  templateUrl: './entidades.component.html',
})
export class EntidadesComponent implements OnInit, OnDestroy {
  entidades?: IEntidades[];
  eventSubscriber?: Subscription;

  constructor(protected entidadesService: EntidadesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.entidadesService.query().subscribe((res: HttpResponse<IEntidades[]>) => (this.entidades = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEntidades();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEntidades): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEntidades(): void {
    this.eventSubscriber = this.eventManager.subscribe('entidadesListModification', () => this.loadAll());
  }

  delete(entidades: IEntidades): void {
    const modalRef = this.modalService.open(EntidadesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.entidades = entidades;
  }
}
