import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPermisosGrupos } from 'app/shared/model/permisos-grupos.model';

@Component({
  selector: 'jhi-permisos-grupos-detail',
  templateUrl: './permisos-grupos-detail.component.html',
})
export class PermisosGruposDetailComponent implements OnInit {
  permisosGrupos: IPermisosGrupos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ permisosGrupos }) => (this.permisosGrupos = permisosGrupos));
  }

  previousState(): void {
    window.history.back();
  }
}
