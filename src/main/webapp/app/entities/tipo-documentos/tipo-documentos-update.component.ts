import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoDocumentos, TipoDocumentos } from 'app/shared/model/tipo-documentos.model';
import { TipoDocumentosService } from './tipo-documentos.service';

@Component({
  selector: 'jhi-tipo-documentos-update',
  templateUrl: './tipo-documentos-update.component.html',
})
export class TipoDocumentosUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tipo: [],
  });

  constructor(protected tipoDocumentosService: TipoDocumentosService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDocumentos }) => {
      this.updateForm(tipoDocumentos);
    });
  }

  updateForm(tipoDocumentos: ITipoDocumentos): void {
    this.editForm.patchValue({
      id: tipoDocumentos.id,
      tipo: tipoDocumentos.tipo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoDocumentos = this.createFromForm();
    if (tipoDocumentos.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoDocumentosService.update(tipoDocumentos));
    } else {
      this.subscribeToSaveResponse(this.tipoDocumentosService.create(tipoDocumentos));
    }
  }

  private createFromForm(): ITipoDocumentos {
    return {
      ...new TipoDocumentos(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDocumentos>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
