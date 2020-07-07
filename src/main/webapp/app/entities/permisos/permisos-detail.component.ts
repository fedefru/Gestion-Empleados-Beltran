import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPermisos } from 'app/shared/model/permisos.model';

@Component({
  selector: 'jhi-permisos-detail',
  templateUrl: './permisos-detail.component.html',
})
export class PermisosDetailComponent implements OnInit {
  permisos: IPermisos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ permisos }) => (this.permisos = permisos));
  }

  previousState(): void {
    window.history.back();
  }
}
