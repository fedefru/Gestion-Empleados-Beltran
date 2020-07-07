import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProvincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from './provincias.service';
import { ProvinciasDeleteDialogComponent } from './provincias-delete-dialog.component';

@Component({
  selector: 'jhi-provincias',
  templateUrl: './provincias.component.html',
})
export class ProvinciasComponent implements OnInit, OnDestroy {
  provincias?: IProvincias[];
  eventSubscriber?: Subscription;

  constructor(protected provinciasService: ProvinciasService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.provinciasService.query().subscribe((res: HttpResponse<IProvincias[]>) => (this.provincias = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProvincias();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProvincias): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProvincias(): void {
    this.eventSubscriber = this.eventManager.subscribe('provinciasListModification', () => this.loadAll());
  }

  delete(provincias: IProvincias): void {
    const modalRef = this.modalService.open(ProvinciasDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.provincias = provincias;
  }
}
