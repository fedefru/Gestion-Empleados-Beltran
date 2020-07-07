import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGrupoUsuarios } from 'app/shared/model/grupo-usuarios.model';
import { GrupoUsuariosService } from './grupo-usuarios.service';
import { GrupoUsuariosDeleteDialogComponent } from './grupo-usuarios-delete-dialog.component';

@Component({
  selector: 'jhi-grupo-usuarios',
  templateUrl: './grupo-usuarios.component.html',
})
export class GrupoUsuariosComponent implements OnInit, OnDestroy {
  grupoUsuarios?: IGrupoUsuarios[];
  eventSubscriber?: Subscription;

  constructor(
    protected grupoUsuariosService: GrupoUsuariosService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.grupoUsuariosService.query().subscribe((res: HttpResponse<IGrupoUsuarios[]>) => (this.grupoUsuarios = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGrupoUsuarios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGrupoUsuarios): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGrupoUsuarios(): void {
    this.eventSubscriber = this.eventManager.subscribe('grupoUsuariosListModification', () => this.loadAll());
  }

  delete(grupoUsuarios: IGrupoUsuarios): void {
    const modalRef = this.modalService.open(GrupoUsuariosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.grupoUsuarios = grupoUsuarios;
  }
}
