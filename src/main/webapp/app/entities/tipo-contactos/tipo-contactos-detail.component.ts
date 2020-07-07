import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoContactos } from 'app/shared/model/tipo-contactos.model';

@Component({
  selector: 'jhi-tipo-contactos-detail',
  templateUrl: './tipo-contactos-detail.component.html',
})
export class TipoContactosDetailComponent implements OnInit {
  tipoContactos: ITipoContactos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoContactos }) => (this.tipoContactos = tipoContactos));
  }

  previousState(): void {
    window.history.back();
  }
}
