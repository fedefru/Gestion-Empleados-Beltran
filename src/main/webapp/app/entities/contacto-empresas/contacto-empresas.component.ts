import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContactoEmpresas } from 'app/shared/model/contacto-empresas.model';
import { ContactoEmpresasService } from './contacto-empresas.service';
import { ContactoEmpresasDeleteDialogComponent } from './contacto-empresas-delete-dialog.component';

@Component({
  selector: 'jhi-contacto-empresas',
  templateUrl: './contacto-empresas.component.html',
})
export class ContactoEmpresasComponent implements OnInit, OnDestroy {
  contactoEmpresas?: IContactoEmpresas[];
  eventSubscriber?: Subscription;

  constructor(
    protected contactoEmpresasService: ContactoEmpresasService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.contactoEmpresasService.query().subscribe((res: HttpResponse<IContactoEmpresas[]>) => (this.contactoEmpresas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInContactoEmpresas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IContactoEmpresas): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInContactoEmpresas(): void {
    this.eventSubscriber = this.eventManager.subscribe('contactoEmpresasListModification', () => this.loadAll());
  }

  delete(contactoEmpresas: IContactoEmpresas): void {
    const modalRef = this.modalService.open(ContactoEmpresasDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.contactoEmpresas = contactoEmpresas;
  }
}
