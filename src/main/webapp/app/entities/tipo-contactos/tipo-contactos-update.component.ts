import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoContactos, TipoContactos } from 'app/shared/model/tipo-contactos.model';
import { TipoContactosService } from './tipo-contactos.service';
import { ITipoDocumentos } from 'app/shared/model/tipo-documentos.model';
import { TipoDocumentosService } from 'app/entities/tipo-documentos/tipo-documentos.service';

@Component({
  selector: 'jhi-tipo-contactos-update',
  templateUrl: './tipo-contactos-update.component.html',
})
export class TipoContactosUpdateComponent implements OnInit {
  isSaving = false;
  tipodocumentos: ITipoDocumentos[] = [];

  editForm = this.fb.group({
    id: [],
    descripcion: [],
    tipoDocumento: [],
  });

  constructor(
    protected tipoContactosService: TipoContactosService,
    protected tipoDocumentosService: TipoDocumentosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoContactos }) => {
      this.updateForm(tipoContactos);

      this.tipoDocumentosService.query().subscribe((res: HttpResponse<ITipoDocumentos[]>) => (this.tipodocumentos = res.body || []));
    });
  }

  updateForm(tipoContactos: ITipoContactos): void {
    this.editForm.patchValue({
      id: tipoContactos.id,
      descripcion: tipoContactos.descripcion,
      tipoDocumento: tipoContactos.tipoDocumento,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoContactos = this.createFromForm();
    if (tipoContactos.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoContactosService.update(tipoContactos));
    } else {
      this.subscribeToSaveResponse(this.tipoContactosService.create(tipoContactos));
    }
  }

  private createFromForm(): ITipoContactos {
    return {
      ...new TipoContactos(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      tipoDocumento: this.editForm.get(['tipoDocumento'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoContactos>>): void {
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

  trackById(index: number, item: ITipoDocumentos): any {
    return item.id;
  }
}
