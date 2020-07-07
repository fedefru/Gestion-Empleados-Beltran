import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPuestos } from 'app/shared/model/puestos.model';

@Component({
  selector: 'jhi-puestos-detail',
  templateUrl: './puestos-detail.component.html',
})
export class PuestosDetailComponent implements OnInit {
  puestos: IPuestos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ puestos }) => (this.puestos = puestos));
  }

  previousState(): void {
    window.history.back();
  }
}
