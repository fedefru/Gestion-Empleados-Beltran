import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConfiguraciones } from 'app/shared/model/configuraciones.model';

@Component({
  selector: 'jhi-configuraciones-detail',
  templateUrl: './configuraciones-detail.component.html',
})
export class ConfiguracionesDetailComponent implements OnInit {
  configuraciones: IConfiguraciones | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ configuraciones }) => (this.configuraciones = configuraciones));
  }

  previousState(): void {
    window.history.back();
  }
}
