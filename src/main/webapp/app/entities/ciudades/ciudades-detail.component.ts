import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICiudades } from 'app/shared/model/ciudades.model';

@Component({
  selector: 'jhi-ciudades-detail',
  templateUrl: './ciudades-detail.component.html',
})
export class CiudadesDetailComponent implements OnInit {
  ciudades: ICiudades | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ciudades }) => (this.ciudades = ciudades));
  }

  previousState(): void {
    window.history.back();
  }
}
