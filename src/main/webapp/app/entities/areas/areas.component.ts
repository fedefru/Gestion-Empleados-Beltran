import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAreas } from 'app/shared/model/areas.model';
import { AreasService } from './areas.service';
import { AreasDeleteDialogComponent } from './areas-delete-dialog.component';

@Component({
  selector: 'jhi-areas',
  templateUrl: './areas.component.html',
})
export class AreasComponent implements OnInit, OnDestroy {
  areas?: IAreas[];
  eventSubscriber?: Subscription;

  constructor(protected areasService: AreasService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.areasService.query().subscribe((res: HttpResponse<IAreas[]>) => (this.areas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAreas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAreas): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAreas(): void {
    this.eventSubscriber = this.eventManager.subscribe('areasListModification', () => this.loadAll());
  }

  delete(areas: IAreas): void {
    const modalRef = this.modalService.open(AreasDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.areas = areas;
  }
}
