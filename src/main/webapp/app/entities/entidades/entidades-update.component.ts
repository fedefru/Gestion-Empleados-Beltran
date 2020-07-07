import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEntidades, Entidades } from 'app/shared/model/entidades.model';
import { EntidadesService } from './entidades.service';

@Component({
  selector: 'jhi-entidades-update',
  templateUrl: './entidades-update.component.html',
})
export class EntidadesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    comentario: [],
  });

  constructor(protected entidadesService: EntidadesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entidades }) => {
      this.updateForm(entidades);
    });
  }

  updateForm(entidades: IEntidades): void {
    this.editForm.patchValue({
      id: entidades.id,
      nombre: entidades.nombre,
      comentario: entidades.comentario,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entidades = this.createFromForm();
    if (entidades.id !== undefined) {
      this.subscribeToSaveResponse(this.entidadesService.update(entidades));
    } else {
      this.subscribeToSaveResponse(this.entidadesService.create(entidades));
    }
  }

  private createFromForm(): IEntidades {
    return {
      ...new Entidades(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      comentario: this.editForm.get(['comentario'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntidades>>): void {
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
