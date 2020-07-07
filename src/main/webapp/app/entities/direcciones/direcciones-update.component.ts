import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDirecciones, Direcciones } from 'app/shared/model/direcciones.model';
import { DireccionesService } from './direcciones.service';
import { ICiudades } from 'app/shared/model/ciudades.model';
import { CiudadesService } from 'app/entities/ciudades/ciudades.service';

@Component({
  selector: 'jhi-direcciones-update',
  templateUrl: './direcciones-update.component.html',
})
export class DireccionesUpdateComponent implements OnInit {
  isSaving = false;
  ciudades: ICiudades[] = [];

  editForm = this.fb.group({
    id: [],
    calle: [],
    altura: [],
    piso: [],
    departamento: [],
    ciudad: [],
  });

  constructor(
    protected direccionesService: DireccionesService,
    protected ciudadesService: CiudadesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ direcciones }) => {
      this.updateForm(direcciones);

      this.ciudadesService.query().subscribe((res: HttpResponse<ICiudades[]>) => (this.ciudades = res.body || []));
    });
  }

  updateForm(direcciones: IDirecciones): void {
    this.editForm.patchValue({
      id: direcciones.id,
      calle: direcciones.calle,
      altura: direcciones.altura,
      piso: direcciones.piso,
      departamento: direcciones.departamento,
      ciudad: direcciones.ciudad,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const direcciones = this.createFromForm();
    if (direcciones.id !== undefined) {
      this.subscribeToSaveResponse(this.direccionesService.update(direcciones));
    } else {
      this.subscribeToSaveResponse(this.direccionesService.create(direcciones));
    }
  }

  private createFromForm(): IDirecciones {
    return {
      ...new Direcciones(),
      id: this.editForm.get(['id'])!.value,
      calle: this.editForm.get(['calle'])!.value,
      altura: this.editForm.get(['altura'])!.value,
      piso: this.editForm.get(['piso'])!.value,
      departamento: this.editForm.get(['departamento'])!.value,
      ciudad: this.editForm.get(['ciudad'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDirecciones>>): void {
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

  trackById(index: number, item: ICiudades): any {
    return item.id;
  }
}
