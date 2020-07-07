import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactoUsuarios } from 'app/shared/model/contacto-usuarios.model';

@Component({
  selector: 'jhi-contacto-usuarios-detail',
  templateUrl: './contacto-usuarios-detail.component.html',
})
export class ContactoUsuariosDetailComponent implements OnInit {
  contactoUsuarios: IContactoUsuarios | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactoUsuarios }) => (this.contactoUsuarios = contactoUsuarios));
  }

  previousState(): void {
    window.history.back();
  }
}
