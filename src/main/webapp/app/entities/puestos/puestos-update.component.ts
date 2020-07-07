import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPuestos, Puestos } from 'app/shared/model/puestos.model';
import { PuestosService } from './puestos.service';

@Component({
  selector: 'jhi-puestos-update',
  templateUrl: './puestos-update.component.html',
})
export class PuestosUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    activo: [],
  });

  constructor(protected puestosService: PuestosService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ puestos }) => {
      this.updateForm(puestos);
    });
  }

  updateForm(puestos: IPuestos): void {
    this.editForm.patchValue({
      id: puestos.id,
      nombre: puestos.nombre,
      activo: puestos.activo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const puestos = this.createFromForm();
    if (puestos.id !== undefined) {
      this.subscribeToSaveResponse(this.puestosService.update(puestos));
    } else {
      this.subscribeToSaveResponse(this.puestosService.create(puestos));
    }
  }

  private createFromForm(): IPuestos {
    return {
      ...new Puestos(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      activo: this.editForm.get(['activo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPuestos>>): void {
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
