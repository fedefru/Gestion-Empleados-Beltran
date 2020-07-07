import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProvincias, Provincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from './provincias.service';
import { IPaises } from 'app/shared/model/paises.model';
import { PaisesService } from 'app/entities/paises/paises.service';

@Component({
  selector: 'jhi-provincias-update',
  templateUrl: './provincias-update.component.html',
})
export class ProvinciasUpdateComponent implements OnInit {
  isSaving = false;
  paises: IPaises[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    pais: [],
  });

  constructor(
    protected provinciasService: ProvinciasService,
    protected paisesService: PaisesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ provincias }) => {
      this.updateForm(provincias);

      this.paisesService.query().subscribe((res: HttpResponse<IPaises[]>) => (this.paises = res.body || []));
    });
  }

  updateForm(provincias: IProvincias): void {
    this.editForm.patchValue({
      id: provincias.id,
      nombre: provincias.nombre,
      pais: provincias.pais,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const provincias = this.createFromForm();
    if (provincias.id !== undefined) {
      this.subscribeToSaveResponse(this.provinciasService.update(provincias));
    } else {
      this.subscribeToSaveResponse(this.provinciasService.create(provincias));
    }
  }

  private createFromForm(): IProvincias {
    return {
      ...new Provincias(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      pais: this.editForm.get(['pais'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProvincias>>): void {
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

  trackById(index: number, item: IPaises): any {
    return item.id;
  }
}
