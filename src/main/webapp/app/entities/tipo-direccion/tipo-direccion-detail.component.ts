import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoDireccion } from 'app/shared/model/tipo-direccion.model';

@Component({
  selector: 'jhi-tipo-direccion-detail',
  templateUrl: './tipo-direccion-detail.component.html',
})
export class TipoDireccionDetailComponent implements OnInit {
  tipoDireccion: ITipoDireccion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDireccion }) => (this.tipoDireccion = tipoDireccion));
  }

  previousState(): void {
    window.history.back();
  }
}
