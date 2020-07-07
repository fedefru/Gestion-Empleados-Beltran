import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoDocumentos } from 'app/shared/model/tipo-documentos.model';
import { TipoDocumentosService } from './tipo-documentos.service';
import { TipoDocumentosDeleteDialogComponent } from './tipo-documentos-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-documentos',
  templateUrl: './tipo-documentos.component.html',
})
export class TipoDocumentosComponent implements OnInit, OnDestroy {
  tipoDocumentos?: ITipoDocumentos[];
  eventSubscriber?: Subscription;

  constructor(
    protected tipoDocumentosService: TipoDocumentosService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.tipoDocumentosService.query().subscribe((res: HttpResponse<ITipoDocumentos[]>) => (this.tipoDocumentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoDocumentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoDocumentos): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoDocumentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoDocumentosListModification', () => this.loadAll());
  }

  delete(tipoDocumentos: ITipoDocumentos): void {
    const modalRef = this.modalService.open(TipoDocumentosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoDocumentos = tipoDocumentos;
  }
}
