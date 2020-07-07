import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGrupos } from 'app/shared/model/grupos.model';
import { GruposService } from './grupos.service';
import { GruposDeleteDialogComponent } from './grupos-delete-dialog.component';

@Component({
  selector: 'jhi-grupos',
  templateUrl: './grupos.component.html',
})
export class GruposComponent implements OnInit, OnDestroy {
  grupos?: IGrupos[];
  eventSubscriber?: Subscription;

  constructor(protected gruposService: GruposService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.gruposService.query().subscribe((res: HttpResponse<IGrupos[]>) => (this.grupos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGrupos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGrupos): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGrupos(): void {
    this.eventSubscriber = this.eventManager.subscribe('gruposListModification', () => this.loadAll());
  }

  delete(grupos: IGrupos): void {
    const modalRef = this.modalService.open(GruposDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.grupos = grupos;
  }
}
