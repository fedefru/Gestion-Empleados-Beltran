/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEmpleados, Empleados } from 'app/shared/model/empleados.model';
import { EmpleadosService } from './empleados.service';
import { IUsuarios, Usuarios } from 'app/shared/model/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/usuarios.service';
import { IEstados } from 'app/shared/model/estados.model';
import { EstadosService } from 'app/entities/estados/estados.service';
import { IAreas } from 'app/shared/model/areas.model';
import { AreasService } from 'app/entities/areas/areas.service';
import { IPuestos } from 'app/shared/model/puestos.model';
import { PuestosService } from 'app/entities/puestos/puestos.service';
import { IFichajes } from 'app/shared/model/fichajes.model';
import { FichajesService } from 'app/entities/fichajes/fichajes.service';
import { IEmpresas } from 'app/shared/model/empresas.model';
import { EmpresasService } from 'app/entities/empresas/empresas.service';

type SelectableEntity = IEmpleados | IUsuarios | IEstados | IAreas | IPuestos | IFichajes | IEmpresas;

@Component({
  selector: 'jhi-empleados-update',
  templateUrl: './empleados-update.component.html',
})
export class EmpleadosUpdateComponent implements OnInit {
  isSaving = false;
  empleadosCollection: IEmpleados[] = [];
  usuarios: IUsuarios[] = [];
  estados: IEstados[] = [];
  areas: IAreas[] = [];
  puestos: IPuestos[] = [];
  fichajes: IFichajes[] = [];
  empresas: IEmpresas[] = [];
  fechaIngresoDp: any;

  editForm = this.fb.group({
    id: [],
    fechaIngreso: [],
    jefe: [],
    usuario: [],
    estado: [],
    area: [],
    puesto: [],
    fichaje: [],
    empresa: [],
  });

  usuarioForm = this.fb.group({
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
    protected empleadosService: EmpleadosService,
    protected usuariosService: UsuariosService,
    protected estadosService: EstadosService,
    protected areasService: AreasService,
    protected puestosService: PuestosService,
    protected fichajesService: FichajesService,
    protected empresasService: EmpresasService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empleados }) => {
      this.updateForm(empleados);

      this.empleadosService.query().subscribe((res: HttpResponse<IEmpleados[]>) => (this.empleadosCollection = res.body || []));

      this.usuariosService.query().subscribe((res: HttpResponse<IUsuarios[]>) => (this.usuarios = res.body || []));

      this.estadosService.query().subscribe((res: HttpResponse<IEstados[]>) => (this.estados = res.body || []));

      this.areasService.query().subscribe((res: HttpResponse<IAreas[]>) => (this.areas = res.body || []));

      this.puestosService.query().subscribe((res: HttpResponse<IPuestos[]>) => (this.puestos = res.body || []));

      this.fichajesService.query().subscribe((res: HttpResponse<IFichajes[]>) => (this.fichajes = res.body || []));

      this.empresasService.query().subscribe((res: HttpResponse<IEmpresas[]>) => (this.empresas = res.body || []));
    });
  }

  updateForm(empleados: IEmpleados): void {
    this.editForm.patchValue({
      id: empleados.id,
      fechaIngreso: empleados.fechaIngreso,
      jefe: empleados.jefe,
      usuario: empleados.usuario,
      estado: empleados.estado,
      area: empleados.area,
      puesto: empleados.puesto,
      fichaje: empleados.fichaje,
      empresa: empleados.empresa,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const empleados = this.createFromForm();

    this.subscribeToSaveResponse(this.empleadosService.createEmp(empleados));
  }

  private createUsuarioFromForm(): IUsuarios {
    return {
      ...new Usuarios(),
      id: this.usuarioForm.get(['id'])!.value,
      nombre: this.usuarioForm.get(['nombre'])!.value,
      apellido: this.usuarioForm.get(['apellido'])!.value,
      fechaNac: this.usuarioForm.get(['fechaNac'])!.value,
      clave: this.usuarioForm.get(['clave'])!.value,
      usuario: this.usuarioForm.get(['usuario'])!.value,
      estado: this.usuarioForm.get(['estado'])!.value,
      direccion: this.usuarioForm.get(['direccion'])!.value,
      contacto: this.usuarioForm.get(['contacto'])!.value,
    };
  }
  private createFromForm(): IEmpleados {
    return {
      ...new Empleados(),
      id: this.editForm.get(['id'])!.value,
      fechaIngreso: this.editForm.get(['fechaIngreso'])!.value,
      jefe: this.editForm.get(['jefe'])!.value,
      usuario: this.createUsuarioFromForm(),
      estado: this.editForm.get(['estado'])!.value,
      area: this.editForm.get(['area'])!.value,
      puesto: this.editForm.get(['puesto'])!.value,
      fichaje: this.editForm.get(['fichaje'])!.value,
      empresa: this.editForm.get(['empresa'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpleados>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected subscribeToSaveResponseUser(result: Observable<HttpResponse<IUsuarios>>): void {
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
/* eslint-enable no-console */
