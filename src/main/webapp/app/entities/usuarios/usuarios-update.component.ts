import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUsuarios, Usuarios } from 'app/shared/model/usuarios.model';
import { UsuariosService } from './usuarios.service';
import { IEstados } from 'app/shared/model/estados.model';
import { EstadosService } from 'app/entities/estados/estados.service';
import { ITipoDireccion } from 'app/shared/model/tipo-direccion.model';
import { TipoDireccionService } from 'app/entities/tipo-direccion/tipo-direccion.service';
import { ITipoContactos } from 'app/shared/model/tipo-contactos.model';
import { TipoContactosService } from 'app/entities/tipo-contactos/tipo-contactos.service';

type SelectableEntity = IEstados | ITipoDireccion | ITipoContactos;

@Component({
  selector: 'jhi-usuarios-update',
  templateUrl: './usuarios-update.component.html',
})
export class UsuariosUpdateComponent implements OnInit {
  isSaving = false;
  estados: IEstados[] = [];
  tipodireccions: ITipoDireccion[] = [];
  tipocontactos: ITipoContactos[] = [];
  fechaNacDp: any;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    apellido: [],
    fechaNac: [],
    clave: [],
    usuario: [],
    estado: [],
    direccion: [],
    contacto: [],
  });

  constructor(
    protected usuariosService: UsuariosService,
    protected estadosService: EstadosService,
    protected tipoDireccionService: TipoDireccionService,
    protected tipoContactosService: TipoContactosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuarios }) => {
      this.updateForm(usuarios);

      this.estadosService.query().subscribe((res: HttpResponse<IEstados[]>) => (this.estados = res.body || []));

      this.tipoDireccionService.query().subscribe((res: HttpResponse<ITipoDireccion[]>) => (this.tipodireccions = res.body || []));

      this.tipoContactosService.query().subscribe((res: HttpResponse<ITipoContactos[]>) => (this.tipocontactos = res.body || []));
    });
  }

  updateForm(usuarios: IUsuarios): void {
    this.editForm.patchValue({
      id: usuarios.id,
      nombre: usuarios.nombre,
      apellido: usuarios.apellido,
      fechaNac: usuarios.fechaNac,
      clave: usuarios.clave,
      usuario: usuarios.usuario,
      estado: usuarios.estado,
      direccion: usuarios.direccion,
      contacto: usuarios.contacto,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuarios = this.createFromForm();
    if (usuarios.id !== undefined) {
      this.subscribeToSaveResponse(this.usuariosService.update(usuarios));
    } else {
      this.subscribeToSaveResponse(this.usuariosService.create(usuarios));
    }
  }

  private createFromForm(): IUsuarios {
    return {
      ...new Usuarios(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellido: this.editForm.get(['apellido'])!.value,
      fechaNac: this.editForm.get(['fechaNac'])!.value,
      clave: this.editForm.get(['clave'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
      contacto: this.editForm.get(['contacto'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarios>>): void {
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
