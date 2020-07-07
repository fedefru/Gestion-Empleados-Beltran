import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICiudades, Ciudades } from 'app/shared/model/ciudades.model';
import { CiudadesService } from './ciudades.service';
import { IProvincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from 'app/entities/provincias/provincias.service';

@Component({
  selector: 'jhi-ciudades-update',
  templateUrl: './ciudades-update.component.html',
})
export class CiudadesUpdateComponent implements OnInit {
  isSaving = false;
  provincias: IProvincias[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    provicia: [],
  });

  constructor(
    protected ciudadesService: CiudadesService,
    protected provinciasService: ProvinciasService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ciudades }) => {
      this.updateForm(ciudades);

      this.provinciasService.query().subscribe((res: HttpResponse<IProvincias[]>) => (this.provincias = res.body || []));
    });
  }

  updateForm(ciudades: ICiudades): void {
    this.editForm.patchValue({
      id: ciudades.id,
      nombre: ciudades.nombre,
      provicia: ciudades.provicia,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ciudades = this.createFromForm();
    if (ciudades.id !== undefined) {
      this.subscribeToSaveResponse(this.ciudadesService.update(ciudades));
    } else {
      this.subscribeToSaveResponse(this.ciudadesService.create(ciudades));
    }
  }

  private createFromForm(): ICiudades {
    return {
      ...new Ciudades(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      provicia: this.editForm.get(['provicia'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICiudades>>): void {
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

  trackById(index: number, item: IProvincias): any {
    return item.id;
  }
}
