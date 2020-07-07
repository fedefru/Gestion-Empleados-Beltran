import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConfiguraciones } from 'app/shared/model/configuraciones.model';
import { ConfiguracionesService } from './configuraciones.service';
import { ConfiguracionesDeleteDialogComponent } from './configuraciones-delete-dialog.component';

@Component({
  selector: 'jhi-configuraciones',
  templateUrl: './configuraciones.component.html',
})
export class ConfiguracionesComponent implements OnInit, OnDestroy {
  configuraciones?: IConfiguraciones[];
  eventSubscriber?: Subscription;

  constructor(
    protected configuracionesService: ConfiguracionesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.configuracionesService.query().subscribe((res: HttpResponse<IConfiguraciones[]>) => (this.configuraciones = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInConfiguraciones();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IConfiguraciones): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInConfiguraciones(): void {
    this.eventSubscriber = this.eventManager.subscribe('configuracionesListModification', () => this.loadAll());
  }

  delete(configuraciones: IConfiguraciones): void {
    const modalRef = this.modalService.open(ConfiguracionesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.configuraciones = configuraciones;
  }
}
