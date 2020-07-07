import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPermisosGrupos, PermisosGrupos } from 'app/shared/model/permisos-grupos.model';
import { PermisosGruposService } from './permisos-grupos.service';
import { IPermisos } from 'app/shared/model/permisos.model';
import { PermisosService } from 'app/entities/permisos/permisos.service';
import { IGrupos } from 'app/shared/model/grupos.model';
import { GruposService } from 'app/entities/grupos/grupos.service';

type SelectableEntity = IPermisos | IGrupos;

@Component({
  selector: 'jhi-permisos-grupos-update',
  templateUrl: './permisos-grupos-update.component.html',
})
export class PermisosGruposUpdateComponent implements OnInit {
  isSaving = false;
  permisos: IPermisos[] = [];
  grupos: IGrupos[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    permiso: [],
    grupos: [],
  });

  constructor(
    protected permisosGruposService: PermisosGruposService,
    protected permisosService: PermisosService,
    protected gruposService: GruposService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ permisosGrupos }) => {
      this.updateForm(permisosGrupos);

      this.permisosService.query().subscribe((res: HttpResponse<IPermisos[]>) => (this.permisos = res.body || []));

      this.gruposService.query().subscribe((res: HttpResponse<IGrupos[]>) => (this.grupos = res.body || []));
    });
  }

  updateForm(permisosGrupos: IPermisosGrupos): void {
    this.editForm.patchValue({
      id: permisosGrupos.id,
      nombre: permisosGrupos.nombre,
      permiso: permisosGrupos.permiso,
      grupos: permisosGrupos.grupos,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const permisosGrupos = this.createFromForm();
    if (permisosGrupos.id !== undefined) {
      this.subscribeToSaveResponse(this.permisosGruposService.update(permisosGrupos));
    } else {
      this.subscribeToSaveResponse(this.permisosGruposService.create(permisosGrupos));
    }
  }

  private createFromForm(): IPermisosGrupos {
    return {
      ...new PermisosGrupos(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      permiso: this.editForm.get(['permiso'])!.value,
      grupos: this.editForm.get(['grupos'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPermisosGrupos>>): void {
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
