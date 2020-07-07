import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPermisosGrupos } from 'app/shared/model/permisos-grupos.model';
import { PermisosGruposService } from './permisos-grupos.service';
import { PermisosGruposDeleteDialogComponent } from './permisos-grupos-delete-dialog.component';

@Component({
  selector: 'jhi-permisos-grupos',
  templateUrl: './permisos-grupos.component.html',
})
export class PermisosGruposComponent implements OnInit, OnDestroy {
  permisosGrupos?: IPermisosGrupos[];
  eventSubscriber?: Subscription;

  constructor(
    protected permisosGruposService: PermisosGruposService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.permisosGruposService.query().subscribe((res: HttpResponse<IPermisosGrupos[]>) => (this.permisosGrupos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPermisosGrupos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPermisosGrupos): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPermisosGrupos(): void {
    this.eventSubscriber = this.eventManager.subscribe('permisosGruposListModification', () => this.loadAll());
  }

  delete(permisosGrupos: IPermisosGrupos): void {
    const modalRef = this.modalService.open(PermisosGruposDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.permisosGrupos = permisosGrupos;
  }
}
