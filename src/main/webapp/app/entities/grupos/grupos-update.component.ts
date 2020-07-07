import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGrupos, Grupos } from 'app/shared/model/grupos.model';
import { GruposService } from './grupos.service';

@Component({
  selector: 'jhi-grupos-update',
  templateUrl: './grupos-update.component.html',
})
export class GruposUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    descripcion: [],
  });

  constructor(protected gruposService: GruposService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupos }) => {
      this.updateForm(grupos);
    });
  }

  updateForm(grupos: IGrupos): void {
    this.editForm.patchValue({
      id: grupos.id,
      nombre: grupos.nombre,
      descripcion: grupos.descripcion,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grupos = this.createFromForm();
    if (grupos.id !== undefined) {
      this.subscribeToSaveResponse(this.gruposService.update(grupos));
    } else {
      this.subscribeToSaveResponse(this.gruposService.create(grupos));
    }
  }

  private createFromForm(): IGrupos {
    return {
      ...new Grupos(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrupos>>): void {
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
