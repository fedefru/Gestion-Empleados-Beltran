import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactoEmpresas } from 'app/shared/model/contacto-empresas.model';

@Component({
  selector: 'jhi-contacto-empresas-detail',
  templateUrl: './contacto-empresas-detail.component.html',
})
export class ContactoEmpresasDetailComponent implements OnInit {
  contactoEmpresas: IContactoEmpresas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactoEmpresas }) => (this.contactoEmpresas = contactoEmpresas));
  }

  previousState(): void {
    window.history.back();
  }
}
