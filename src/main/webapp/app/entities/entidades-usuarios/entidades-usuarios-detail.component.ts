import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntidadesUsuarios } from 'app/shared/model/entidades-usuarios.model';

@Component({
  selector: 'jhi-entidades-usuarios-detail',
  templateUrl: './entidades-usuarios-detail.component.html',
})
export class EntidadesUsuariosDetailComponent implements OnInit {
  entidadesUsuarios: IEntidadesUsuarios | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entidadesUsuarios }) => (this.entidadesUsuarios = entidadesUsuarios));
  }

  previousState(): void {
    window.history.back();
  }
}
