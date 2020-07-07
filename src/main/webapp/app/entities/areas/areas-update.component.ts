import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAreas, Areas } from 'app/shared/model/areas.model';
import { AreasService } from './areas.service';

@Component({
  selector: 'jhi-areas-update',
  templateUrl: './areas-update.component.html',
})
export class AreasUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    codSector: [],
    activo: [],
  });

  constructor(protected areasService: AreasService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ areas }) => {
      this.updateForm(areas);
    });
  }

  updateForm(areas: IAreas): void {
    this.editForm.patchValue({
      id: areas.id,
      nombre: areas.nombre,
      codSector: areas.codSector,
      activo: areas.activo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const areas = this.createFromForm();
    if (areas.id !== undefined) {
      this.subscribeToSaveResponse(this.areasService.update(areas));
    } else {
      this.subscribeToSaveResponse(this.areasService.create(areas));
    }
  }

  private createFromForm(): IAreas {
    return {
      ...new Areas(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      codSector: this.editForm.get(['codSector'])!.value,
      activo: this.editForm.get(['activo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAreas>>): void {
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
