import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPermisos, Permisos } from 'app/shared/model/permisos.model';
import { PermisosService } from './permisos.service';

@Component({
  selector: 'jhi-permisos-update',
  templateUrl: './permisos-update.component.html',
})
export class PermisosUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    descripcion: [],
  });

  constructor(protected permisosService: PermisosService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ permisos }) => {
      this.updateForm(permisos);
    });
  }

  updateForm(permisos: IPermisos): void {
    this.editForm.patchValue({
      id: permisos.id,
      nombre: permisos.nombre,
      descripcion: permisos.descripcion,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const permisos = this.createFromForm();
    if (permisos.id !== undefined) {
      this.subscribeToSaveResponse(this.permisosService.update(permisos));
    } else {
      this.subscribeToSaveResponse(this.permisosService.create(permisos));
    }
  }

  private createFromForm(): IPermisos {
    return {
      ...new Permisos(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPermisos>>): void {
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
