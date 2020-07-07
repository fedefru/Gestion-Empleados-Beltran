import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGrupoUsuarios } from 'app/shared/model/grupo-usuarios.model';

@Component({
  selector: 'jhi-grupo-usuarios-detail',
  templateUrl: './grupo-usuarios-detail.component.html',
})
export class GrupoUsuariosDetailComponent implements OnInit {
  grupoUsuarios: IGrupoUsuarios | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupoUsuarios }) => (this.grupoUsuarios = grupoUsuarios));
  }

  previousState(): void {
    window.history.back();
  }
}
