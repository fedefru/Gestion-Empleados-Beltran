import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaises } from 'app/shared/model/paises.model';

@Component({
  selector: 'jhi-paises-detail',
  templateUrl: './paises-detail.component.html',
})
export class PaisesDetailComponent implements OnInit {
  paises: IPaises | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paises }) => (this.paises = paises));
  }

  previousState(): void {
    window.history.back();
  }
}
