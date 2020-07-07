import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoDocumentos } from 'app/shared/model/tipo-documentos.model';

@Component({
  selector: 'jhi-tipo-documentos-detail',
  templateUrl: './tipo-documentos-detail.component.html',
})
export class TipoDocumentosDetailComponent implements OnInit {
  tipoDocumentos: ITipoDocumentos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDocumentos }) => (this.tipoDocumentos = tipoDocumentos));
  }

  previousState(): void {
    window.history.back();
  }
}
