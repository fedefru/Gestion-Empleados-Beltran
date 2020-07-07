import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProvincias } from 'app/shared/model/provincias.model';

@Component({
  selector: 'jhi-provincias-detail',
  templateUrl: './provincias-detail.component.html',
})
export class ProvinciasDetailComponent implements OnInit {
  provincias: IProvincias | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ provincias }) => (this.provincias = provincias));
  }

  previousState(): void {
    window.history.back();
  }
}
