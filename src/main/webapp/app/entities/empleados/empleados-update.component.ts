/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEmpleados } from 'app/shared/model/empleados.model';
import { EmpleadosService } from './empleados.service';
import { IUsuarios } from 'app/shared/model/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/usuarios.service';
import { IEstados } from 'app/shared/model/estados.model';
import { EstadosService } from 'app/entities/estados/estados.service';
import { IAreas } from 'app/shared/model/areas.model';
import { AreasService } from 'app/entities/areas/areas.service';
import { IPuestos } from 'app/shared/model/puestos.model';
import { PuestosService } from 'app/entities/puestos/puestos.service';
import { TipoDocumentosService } from 'app/entities/tipo-documentos/tipo-documentos.service';
import { IFichajes } from 'app/shared/model/fichajes.model';
import { FichajesService } from 'app/entities/fichajes/fichajes.service';
import { IEmpresas } from 'app/shared/model/empresas.model';
import { EmpresasService } from 'app/entities/empresas/empresas.service';
import { ITipoDocumentos } from 'app/shared/model/tipo-documentos.model';
import { IPaises } from 'app/shared/model/paises.model';
import { IProvincias } from 'app/shared/model/provincias.model';
import { ICiudades } from 'app/shared/model/ciudades.model';
import { PaisesService } from '../paises/paises.service';
import { ProvinciasService } from '../provincias/provincias.service';
import { CiudadesService } from '../ciudades/ciudades.service';

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
  paises: IPaises[] = [];
  provincias: IProvincias[] = [];
  ciudades: ICiudades[] = [];
  tipodocumentos?: ITipoDocumentos[];
  fechaIngresoDp: any;

  empleadoSeleccionado?: any;

  empleadoForm?: any;

  constructor(
    protected empleadosService: EmpleadosService,
    protected usuariosService: UsuariosService,
    protected estadosService: EstadosService,
    protected areasService: AreasService,
    protected puestosService: PuestosService,
    protected fichajesService: FichajesService,
    protected empresasService: EmpresasService,
    protected tipoDocumentosService: TipoDocumentosService,
    protected paisesService: PaisesService,
    protected provinciasService: ProvinciasService,
    protected ciudadesService: CiudadesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empleados }) => {
      this.empleadosService.query().subscribe((res: HttpResponse<IEmpleados[]>) => (this.empleadosCollection = res.body || []));

      this.usuariosService.query().subscribe((res: HttpResponse<IUsuarios[]>) => (this.usuarios = res.body || []));

      this.estadosService.query().subscribe((res: HttpResponse<IEstados[]>) => (this.estados = res.body || []));

      this.areasService.query().subscribe((res: HttpResponse<IAreas[]>) => (this.areas = res.body || []));

      this.puestosService.query().subscribe((res: HttpResponse<IPuestos[]>) => (this.puestos = res.body || []));

      this.fichajesService.query().subscribe((res: HttpResponse<IFichajes[]>) => (this.fichajes = res.body || []));

      this.empresasService.query().subscribe((res: HttpResponse<IEmpresas[]>) => (this.empresas = res.body || []));

      this.tipoDocumentosService.query().subscribe((res: HttpResponse<ITipoDocumentos[]>) => (this.tipodocumentos = res.body || []));

      this.paisesService.getAll().subscribe((res: HttpResponse<IPaises[]>) => {
        this.paises = res.body || [];
      });

      this.empleadoSeleccionado = empleados;

      console.log(this.empleadoSeleccionado);
      console.log(this.empleadoSeleccionado.usuario.direccion.direccion.ciudad.provicia.pais.nombre);

      if (this.empleadoSeleccionado !== undefined) {
        this.formBuilder();
      }
    });
  }

  formBuilder(): void {
    this.empleadoForm = this.fb.group({
      id: [this.empleadoSeleccionado.usuario.id],
      fechaIngreso: [this.empleadoSeleccionado.fechaIngreso],
      usuario: [this.empleadoSeleccionado.usuario.usuario],
      nombre: [this.empleadoSeleccionado.usuario.nombre],
      apellido: [this.empleadoSeleccionado.usuario.apellido],
      fechaNac: [this.empleadoSeleccionado.usuario.fechaNac],
      clave: [this.empleadoSeleccionado.usuario.clave],
      estado: [this.empleadoSeleccionado.usuario.estado],
      tipoDocumento: [this.empleadoSeleccionado.usuario.contacto.tipoDocumento],
      pais: [this.empleadoSeleccionado.usuario.direccion.direccion.ciudad.provicia.pais],
      /* provicia: [this.empleadoSeleccionado.usuario.direccion.direccion.ciudad.provicia]  */
    });
  }

  actualizarEmpleado(info: any): void {
    console.log(info);
  }

  previousState(): void {
    window.history.back();
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

  setProvincias(country: any): void {
    console.log(country);
    //this.empleadoForm.pais.controls['nombre'].setValue(country);
    country = this.paises?.filter(x => x.nombre === country);
    this.provinciasService.getByCountry(country[0].id).subscribe((res: HttpResponse<IProvincias[]>) => {
      this.provincias = res.body || [];
    });
  }
}
/* eslint-enable no-console */
