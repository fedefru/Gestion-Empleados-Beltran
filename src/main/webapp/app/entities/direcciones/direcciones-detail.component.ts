import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDirecciones } from 'app/shared/model/direcciones.model';

@Component({
  selector: 'jhi-direcciones-detail',
  templateUrl: './direcciones-detail.component.html',
})
export class DireccionesDetailComponent implements OnInit {
  direcciones: IDirecciones | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ direcciones }) => (this.direcciones = direcciones));
  }

  previousState(): void {
    window.history.back();
  }
}
