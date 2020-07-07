import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPaises, Paises } from 'app/shared/model/paises.model';
import { PaisesService } from './paises.service';

@Component({
  selector: 'jhi-paises-update',
  templateUrl: './paises-update.component.html',
})
export class PaisesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
  });

  constructor(protected paisesService: PaisesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paises }) => {
      this.updateForm(paises);
    });
  }

  updateForm(paises: IPaises): void {
    this.editForm.patchValue({
      id: paises.id,
      nombre: paises.nombre,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paises = this.createFromForm();
    if (paises.id !== undefined) {
      this.subscribeToSaveResponse(this.paisesService.update(paises));
    } else {
      this.subscribeToSaveResponse(this.paisesService.create(paises));
    }
  }

  private createFromForm(): IPaises {
    return {
      ...new Paises(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaises>>): void {
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
