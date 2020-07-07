import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFichajes } from 'app/shared/model/fichajes.model';

@Component({
  selector: 'jhi-fichajes-detail',
  templateUrl: './fichajes-detail.component.html',
})
export class FichajesDetailComponent implements OnInit {
  fichajes: IFichajes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fichajes }) => (this.fichajes = fichajes));
  }

  previousState(): void {
    window.history.back();
  }
}
