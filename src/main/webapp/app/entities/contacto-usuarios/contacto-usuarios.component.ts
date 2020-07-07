import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContactoUsuarios } from 'app/shared/model/contacto-usuarios.model';
import { ContactoUsuariosService } from './contacto-usuarios.service';
import { ContactoUsuariosDeleteDialogComponent } from './contacto-usuarios-delete-dialog.component';

@Component({
  selector: 'jhi-contacto-usuarios',
  templateUrl: './contacto-usuarios.component.html',
})
export class ContactoUsuariosComponent implements OnInit, OnDestroy {
  contactoUsuarios?: IContactoUsuarios[];
  eventSubscriber?: Subscription;

  constructor(
    protected contactoUsuariosService: ContactoUsuariosService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.contactoUsuariosService.query().subscribe((res: HttpResponse<IContactoUsuarios[]>) => (this.contactoUsuarios = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInContactoUsuarios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IContactoUsuarios): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInContactoUsuarios(): void {
    this.eventSubscriber = this.eventManager.subscribe('contactoUsuariosListModification', () => this.loadAll());
  }

  delete(contactoUsuarios: IContactoUsuarios): void {
    const modalRef = this.modalService.open(ContactoUsuariosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.contactoUsuarios = contactoUsuarios;
  }
}
