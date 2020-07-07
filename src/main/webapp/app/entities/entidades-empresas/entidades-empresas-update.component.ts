import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEntidadesEmpresas, EntidadesEmpresas } from 'app/shared/model/entidades-empresas.model';
import { EntidadesEmpresasService } from './entidades-empresas.service';
import { IEmpresas } from 'app/shared/model/empresas.model';
import { EmpresasService } from 'app/entities/empresas/empresas.service';
import { IEntidades } from 'app/shared/model/entidades.model';
import { EntidadesService } from 'app/entities/entidades/entidades.service';

type SelectableEntity = IEmpresas | IEntidades;

@Component({
  selector: 'jhi-entidades-empresas-update',
  templateUrl: './entidades-empresas-update.component.html',
})
export class EntidadesEmpresasUpdateComponent implements OnInit {
  isSaving = false;
  empresas: IEmpresas[] = [];
  entidades: IEntidades[] = [];

  editForm = this.fb.group({
    id: [],
    valor: [],
    empresa: [],
    entidad: [],
  });

  constructor(
    protected entidadesEmpresasService: EntidadesEmpresasService,
    protected empresasService: EmpresasService,
    protected entidadesService: EntidadesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entidadesEmpresas }) => {
      this.updateForm(entidadesEmpresas);

      this.empresasService.query().subscribe((res: HttpResponse<IEmpresas[]>) => (this.empresas = res.body || []));

      this.entidadesService.query().subscribe((res: HttpResponse<IEntidades[]>) => (this.entidades = res.body || []));
    });
  }

  updateForm(entidadesEmpresas: IEntidadesEmpresas): void {
    this.editForm.patchValue({
      id: entidadesEmpresas.id,
      valor: entidadesEmpresas.valor,
      empresa: entidadesEmpresas.empresa,
      entidad: entidadesEmpresas.entidad,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entidadesEmpresas = this.createFromForm();
    if (entidadesEmpresas.id !== undefined) {
      this.subscribeToSaveResponse(this.entidadesEmpresasService.update(entidadesEmpresas));
    } else {
      this.subscribeToSaveResponse(this.entidadesEmpresasService.create(entidadesEmpresas));
    }
  }

  private createFromForm(): IEntidadesEmpresas {
    return {
      ...new EntidadesEmpresas(),
      id: this.editForm.get(['id'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      empresa: this.editForm.get(['empresa'])!.value,
      entidad: this.editForm.get(['entidad'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntidadesEmpresas>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
