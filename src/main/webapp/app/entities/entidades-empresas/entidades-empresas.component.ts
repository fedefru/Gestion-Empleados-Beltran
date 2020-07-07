import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntidadesEmpresas } from 'app/shared/model/entidades-empresas.model';
import { EntidadesEmpresasService } from './entidades-empresas.service';
import { EntidadesEmpresasDeleteDialogComponent } from './entidades-empresas-delete-dialog.component';

@Component({
  selector: 'jhi-entidades-empresas',
  templateUrl: './entidades-empresas.component.html',
})
export class EntidadesEmpresasComponent implements OnInit, OnDestroy {
  entidadesEmpresas?: IEntidadesEmpresas[];
  eventSubscriber?: Subscription;

  constructor(
    protected entidadesEmpresasService: EntidadesEmpresasService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.entidadesEmpresasService.query().subscribe((res: HttpResponse<IEntidadesEmpresas[]>) => (this.entidadesEmpresas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEntidadesEmpresas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEntidadesEmpresas): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEntidadesEmpresas(): void {
    this.eventSubscriber = this.eventManager.subscribe('entidadesEmpresasListModification', () => this.loadAll());
  }

  delete(entidadesEmpresas: IEntidadesEmpresas): void {
    const modalRef = this.modalService.open(EntidadesEmpresasDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.entidadesEmpresas = entidadesEmpresas;
  }
}
