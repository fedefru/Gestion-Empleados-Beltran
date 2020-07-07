import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoDireccion, TipoDireccion } from 'app/shared/model/tipo-direccion.model';
import { TipoDireccionService } from './tipo-direccion.service';
import { IDirecciones } from 'app/shared/model/direcciones.model';
import { DireccionesService } from 'app/entities/direcciones/direcciones.service';

@Component({
  selector: 'jhi-tipo-direccion-update',
  templateUrl: './tipo-direccion-update.component.html',
})
export class TipoDireccionUpdateComponent implements OnInit {
  isSaving = false;
  direcciones: IDirecciones[] = [];

  editForm = this.fb.group({
    id: [],
    descripcion: [],
    direccion: [],
  });

  constructor(
    protected tipoDireccionService: TipoDireccionService,
    protected direccionesService: DireccionesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDireccion }) => {
      this.updateForm(tipoDireccion);

      this.direccionesService.query().subscribe((res: HttpResponse<IDirecciones[]>) => (this.direcciones = res.body || []));
    });
  }

  updateForm(tipoDireccion: ITipoDireccion): void {
    this.editForm.patchValue({
      id: tipoDireccion.id,
      descripcion: tipoDireccion.descripcion,
      direccion: tipoDireccion.direccion,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoDireccion = this.createFromForm();
    if (tipoDireccion.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoDireccionService.update(tipoDireccion));
    } else {
      this.subscribeToSaveResponse(this.tipoDireccionService.create(tipoDireccion));
    }
  }

  private createFromForm(): ITipoDireccion {
    return {
      ...new TipoDireccion(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDireccion>>): void {
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

  trackById(index: number, item: IDirecciones): any {
    return item.id;
  }
}
