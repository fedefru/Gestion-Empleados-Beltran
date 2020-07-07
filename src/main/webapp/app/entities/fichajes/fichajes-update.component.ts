import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFichajes, Fichajes } from 'app/shared/model/fichajes.model';
import { FichajesService } from './fichajes.service';

@Component({
  selector: 'jhi-fichajes-update',
  templateUrl: './fichajes-update.component.html',
})
export class FichajesUpdateComponent implements OnInit {
  isSaving = false;
  fichajeDp: any;

  editForm = this.fb.group({
    id: [],
    fichaje: [],
    accion: [],
  });

  constructor(protected fichajesService: FichajesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fichajes }) => {
      this.updateForm(fichajes);
    });
  }

  updateForm(fichajes: IFichajes): void {
    this.editForm.patchValue({
      id: fichajes.id,
      fichaje: fichajes.fichaje,
      accion: fichajes.accion,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fichajes = this.createFromForm();
    if (fichajes.id !== undefined) {
      this.subscribeToSaveResponse(this.fichajesService.update(fichajes));
    } else {
      this.subscribeToSaveResponse(this.fichajesService.create(fichajes));
    }
  }

  private createFromForm(): IFichajes {
    return {
      ...new Fichajes(),
      id: this.editForm.get(['id'])!.value,
      fichaje: this.editForm.get(['fichaje'])!.value,
      accion: this.editForm.get(['accion'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFichajes>>): void {
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
