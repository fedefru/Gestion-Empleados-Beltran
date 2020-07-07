import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAreas } from 'app/shared/model/areas.model';

@Component({
  selector: 'jhi-areas-detail',
  templateUrl: './areas-detail.component.html',
})
export class AreasDetailComponent implements OnInit {
  areas: IAreas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ areas }) => (this.areas = areas));
  }

  previousState(): void {
    window.history.back();
  }
}
