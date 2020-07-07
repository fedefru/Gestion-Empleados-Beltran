import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFichajes } from 'app/shared/model/fichajes.model';
import { FichajesService } from './fichajes.service';
import { FichajesDeleteDialogComponent } from './fichajes-delete-dialog.component';

@Component({
  selector: 'jhi-fichajes',
  templateUrl: './fichajes.component.html',
})
export class FichajesComponent implements OnInit, OnDestroy {
  fichajes?: IFichajes[];
  eventSubscriber?: Subscription;

  constructor(protected fichajesService: FichajesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.fichajesService.query().subscribe((res: HttpResponse<IFichajes[]>) => (this.fichajes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFichajes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFichajes): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFichajes(): void {
    this.eventSubscriber = this.eventManager.subscribe('fichajesListModification', () => this.loadAll());
  }

  delete(fichajes: IFichajes): void {
    const modalRef = this.modalService.open(FichajesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fichajes = fichajes;
  }
}
