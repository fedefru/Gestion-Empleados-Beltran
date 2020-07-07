import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntidadesUsuarios } from 'app/shared/model/entidades-usuarios.model';
import { EntidadesUsuariosService } from './entidades-usuarios.service';
import { EntidadesUsuariosDeleteDialogComponent } from './entidades-usuarios-delete-dialog.component';

@Component({
  selector: 'jhi-entidades-usuarios',
  templateUrl: './entidades-usuarios.component.html',
})
export class EntidadesUsuariosComponent implements OnInit, OnDestroy {
  entidadesUsuarios?: IEntidadesUsuarios[];
  eventSubscriber?: Subscription;

  constructor(
    protected entidadesUsuariosService: EntidadesUsuariosService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.entidadesUsuariosService.query().subscribe((res: HttpResponse<IEntidadesUsuarios[]>) => (this.entidadesUsuarios = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEntidadesUsuarios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEntidadesUsuarios): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEntidadesUsuarios(): void {
    this.eventSubscriber = this.eventManager.subscribe('entidadesUsuariosListModification', () => this.loadAll());
  }

  delete(entidadesUsuarios: IEntidadesUsuarios): void {
    const modalRef = this.modalService.open(EntidadesUsuariosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.entidadesUsuarios = entidadesUsuarios;
  }
}
