import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntidades } from 'app/shared/model/entidades.model';

@Component({
  selector: 'jhi-entidades-detail',
  templateUrl: './entidades-detail.component.html',
})
export class EntidadesDetailComponent implements OnInit {
  entidades: IEntidades | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entidades }) => (this.entidades = entidades));
  }

  previousState(): void {
    window.history.back();
  }
}
