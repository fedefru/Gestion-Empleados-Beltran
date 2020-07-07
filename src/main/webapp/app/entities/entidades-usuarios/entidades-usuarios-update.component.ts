import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEntidadesUsuarios, EntidadesUsuarios } from 'app/shared/model/entidades-usuarios.model';
import { EntidadesUsuariosService } from './entidades-usuarios.service';
import { IUsuarios } from 'app/shared/model/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/usuarios.service';
import { IEntidades } from 'app/shared/model/entidades.model';
import { EntidadesService } from 'app/entities/entidades/entidades.service';

type SelectableEntity = IUsuarios | IEntidades;

@Component({
  selector: 'jhi-entidades-usuarios-update',
  templateUrl: './entidades-usuarios-update.component.html',
})
export class EntidadesUsuariosUpdateComponent implements OnInit {
  isSaving = false;
  usuarios: IUsuarios[] = [];
  entidades: IEntidades[] = [];

  editForm = this.fb.group({
    id: [],
    valor: [],
    usuario: [],
    entidad: [],
  });

  constructor(
    protected entidadesUsuariosService: EntidadesUsuariosService,
    protected usuariosService: UsuariosService,
    protected entidadesService: EntidadesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entidadesUsuarios }) => {
      this.updateForm(entidadesUsuarios);

      this.usuariosService.query().subscribe((res: HttpResponse<IUsuarios[]>) => (this.usuarios = res.body || []));

      this.entidadesService.query().subscribe((res: HttpResponse<IEntidades[]>) => (this.entidades = res.body || []));
    });
  }

  updateForm(entidadesUsuarios: IEntidadesUsuarios): void {
    this.editForm.patchValue({
      id: entidadesUsuarios.id,
      valor: entidadesUsuarios.valor,
      usuario: entidadesUsuarios.usuario,
      entidad: entidadesUsuarios.entidad,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entidadesUsuarios = this.createFromForm();
    if (entidadesUsuarios.id !== undefined) {
      this.subscribeToSaveResponse(this.entidadesUsuariosService.update(entidadesUsuarios));
    } else {
      this.subscribeToSaveResponse(this.entidadesUsuariosService.create(entidadesUsuarios));
    }
  }

  private createFromForm(): IEntidadesUsuarios {
    return {
      ...new EntidadesUsuarios(),
      id: this.editForm.get(['id'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      entidad: this.editForm.get(['entidad'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntidadesUsuarios>>): void {
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
