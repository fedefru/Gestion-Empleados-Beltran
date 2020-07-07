import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IConfiguraciones, Configuraciones } from 'app/shared/model/configuraciones.model';
import { ConfiguracionesService } from './configuraciones.service';

@Component({
  selector: 'jhi-configuraciones-update',
  templateUrl: './configuraciones-update.component.html',
})
export class ConfiguracionesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    clave: [],
    valor: [],
    detalle: [],
  });

  constructor(
    protected configuracionesService: ConfiguracionesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ configuraciones }) => {
      this.updateForm(configuraciones);
    });
  }

  updateForm(configuraciones: IConfiguraciones): void {
    this.editForm.patchValue({
      id: configuraciones.id,
      clave: configuraciones.clave,
      valor: configuraciones.valor,
      detalle: configuraciones.detalle,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const configuraciones = this.createFromForm();
    if (configuraciones.id !== undefined) {
      this.subscribeToSaveResponse(this.configuracionesService.update(configuraciones));
    } else {
      this.subscribeToSaveResponse(this.configuracionesService.create(configuraciones));
    }
  }

  private createFromForm(): IConfiguraciones {
    return {
      ...new Configuraciones(),
      id: this.editForm.get(['id'])!.value,
      clave: this.editForm.get(['clave'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      detalle: this.editForm.get(['detalle'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConfiguraciones>>): void {
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
