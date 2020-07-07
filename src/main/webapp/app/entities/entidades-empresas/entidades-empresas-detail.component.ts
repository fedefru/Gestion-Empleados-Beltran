import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntidadesEmpresas } from 'app/shared/model/entidades-empresas.model';

@Component({
  selector: 'jhi-entidades-empresas-detail',
  templateUrl: './entidades-empresas-detail.component.html',
})
export class EntidadesEmpresasDetailComponent implements OnInit {
  entidadesEmpresas: IEntidadesEmpresas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entidadesEmpresas }) => (this.entidadesEmpresas = entidadesEmpresas));
  }

  previousState(): void {
    window.history.back();
  }
}
