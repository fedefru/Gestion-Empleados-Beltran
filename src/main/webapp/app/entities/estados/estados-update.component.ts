import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEstados, Estados } from 'app/shared/model/estados.model';
import { EstadosService } from './estados.service';

@Component({
  selector: 'jhi-estados-update',
  templateUrl: './estados-update.component.html',
})
export class EstadosUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
  });

  constructor(protected estadosService: EstadosService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estados }) => {
      this.updateForm(estados);
    });
  }

  updateForm(estados: IEstados): void {
    this.editForm.patchValue({
      id: estados.id,
      nombre: estados.nombre,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estados = this.createFromForm();
    if (estados.id !== undefined) {
      this.subscribeToSaveResponse(this.estadosService.update(estados));
    } else {
      this.subscribeToSaveResponse(this.estadosService.create(estados));
    }
  }

  private createFromForm(): IEstados {
    return {
      ...new Estados(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstados>>): void {
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
