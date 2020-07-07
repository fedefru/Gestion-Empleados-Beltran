import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGrupoUsuarios, GrupoUsuarios } from 'app/shared/model/grupo-usuarios.model';
import { GrupoUsuariosService } from './grupo-usuarios.service';
import { IUsuarios } from 'app/shared/model/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/usuarios.service';
import { IGrupos } from 'app/shared/model/grupos.model';
import { GruposService } from 'app/entities/grupos/grupos.service';

type SelectableEntity = IUsuarios | IGrupos;

@Component({
  selector: 'jhi-grupo-usuarios-update',
  templateUrl: './grupo-usuarios-update.component.html',
})
export class GrupoUsuariosUpdateComponent implements OnInit {
  isSaving = false;
  usuarios: IUsuarios[] = [];
  grupos: IGrupos[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    usuario: [],
    grupo: [],
  });

  constructor(
    protected grupoUsuariosService: GrupoUsuariosService,
    protected usuariosService: UsuariosService,
    protected gruposService: GruposService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupoUsuarios }) => {
      this.updateForm(grupoUsuarios);

      this.usuariosService.query().subscribe((res: HttpResponse<IUsuarios[]>) => (this.usuarios = res.body || []));

      this.gruposService.query().subscribe((res: HttpResponse<IGrupos[]>) => (this.grupos = res.body || []));
    });
  }

  updateForm(grupoUsuarios: IGrupoUsuarios): void {
    this.editForm.patchValue({
      id: grupoUsuarios.id,
      nombre: grupoUsuarios.nombre,
      usuario: grupoUsuarios.usuario,
      grupo: grupoUsuarios.grupo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grupoUsuarios = this.createFromForm();
    if (grupoUsuarios.id !== undefined) {
      this.subscribeToSaveResponse(this.grupoUsuariosService.update(grupoUsuarios));
    } else {
      this.subscribeToSaveResponse(this.grupoUsuariosService.create(grupoUsuarios));
    }
  }

  private createFromForm(): IGrupoUsuarios {
    return {
      ...new GrupoUsuarios(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      grupo: this.editForm.get(['grupo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrupoUsuarios>>): void {
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
