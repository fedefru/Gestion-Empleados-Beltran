/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
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
import { TipoDocumentosService } from 'app/entities/tipo-documentos/tipo-documentos.service';
import { IFichajes } from 'app/shared/model/fichajes.model';
import { FichajesService } from 'app/entities/fichajes/fichajes.service';
import { IEmpresas } from 'app/shared/model/empresas.model';
import { EmpresasService } from 'app/entities/empresas/empresas.service';
import { ITipoDocumentos } from 'app/shared/model/tipo-documentos.model';
import { IPaises, Paises } from 'app/shared/model/paises.model';
import { IProvincias, Provincias } from 'app/shared/model/provincias.model';
import { Ciudades, ICiudades } from 'app/shared/model/ciudades.model';
import { PaisesService } from '../paises/paises.service';
import { ProvinciasService } from '../provincias/provincias.service';
import { CiudadesService } from '../ciudades/ciudades.service';
import { ITipoContactos, TipoContactos } from 'app/shared/model/tipo-contactos.model';
import { Direcciones, IDirecciones } from 'app/shared/model/direcciones.model';
import { EmpleadoRegistroDto } from 'app/shared/model/empleado-registro-dto.model';

type SelectableEntity = IEmpleados | IUsuarios | IEstados | IAreas | IPuestos | IFichajes | IEmpresas;

@Component({
  selector: 'jhi-empleados-new-update',
  templateUrl: './empleados-new-update.component.html',
})
export class EmpleadosNewUpdateComponent implements OnInit {
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
  empleadoSeleccionado: any;

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

  contactoForm = this.fb.group({
    id: [],
    valorDocumento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    tipoDocumentos: ['', [Validators.required]],
  });

  paisForm = this.fb.group({
    id: [],
    nombre: ['', [Validators.required]],
  });

  provinciaForm = this.fb.group({
    id: [],
    nombre: ['', [Validators.required]],
    pais: ['', [Validators.required]],
  });

  ciudadForm = this.fb.group({
    id: [],
    nombre: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
  });

  direccionesForm = this.fb.group({
    id: [],
    calle: ['', [Validators.required]],
    altura: ['', [Validators.required]],
    piso: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
  });

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
      this.updateForm(empleados);

      this.empleadosService.query().subscribe((res: HttpResponse<IEmpleados[]>) => (this.empleadosCollection = res.body || []));

      this.usuariosService.query().subscribe((res: HttpResponse<IUsuarios[]>) => (this.usuarios = res.body || []));

      this.estadosService.query().subscribe((res: HttpResponse<IEstados[]>) => (this.estados = res.body || []));

      this.areasService.query().subscribe((res: HttpResponse<IAreas[]>) => (this.areas = res.body || []));

      this.puestosService.query().subscribe((res: HttpResponse<IPuestos[]>) => (this.puestos = res.body || []));

      /* this.fichajesService.query().subscribe((res: HttpResponse<IFichajes[]>) => (this.fichajes = res.body || [])); */

      this.empresasService.query().subscribe((res: HttpResponse<IEmpresas[]>) => (this.empresas = res.body || []));

      this.tipoDocumentosService.query().subscribe((res: HttpResponse<ITipoDocumentos[]>) => (this.tipodocumentos = res.body || []));

      this.paisesService.getAll().subscribe((res: HttpResponse<IPaises[]>) => {
        this.paises = res.body || [];
      });

      console.clear();

      this.empleadoSeleccionado = empleados;

      console.log(this.empleadoSeleccionado);
      this.setValores();
    });
  }

  setValores(): void {
    this.usuarioForm = this.fb.group({
      id: [],
      nombre: [this.empleadoSeleccionado.usuario.nombre],
      apellido: [this.empleadoSeleccionado.usuario.apellido],
      fechaNac: [this.empleadoSeleccionado.usuario.fechaNac],
      clave: [this.empleadoSeleccionado.usuario.clave],
      usuario: [this.empleadoSeleccionado.usuario.usuario],
      estado: [this.empleadoSeleccionado.usuario.estado.nombre],
      direccion: [],
      contacto: [],
    });

    this.contactoForm = this.fb.group({
      id: [],
      valorDocumento: [
        this.empleadoSeleccionado.usuario.contacto.descripcion,
        [Validators.required, Validators.minLength(8), Validators.maxLength(12)],
      ],
      tipoDocumentos: [this.empleadoSeleccionado.usuario.contacto.tipoDocumento, [Validators.required]],
    });

    this.direccionesForm = this.fb.group({
      id: [],
      calle: [this.empleadoSeleccionado.usuario.direccion.direccion.calle, [Validators.required]],
      altura: [this.empleadoSeleccionado.usuario.direccion.direccion.altura, [Validators.required]],
      piso: [this.empleadoSeleccionado.usuario.direccion.direccion.piso, [Validators.required]],
      departamento: [this.empleadoSeleccionado.usuario.direccion.direccion.departamento, [Validators.required]],
      ciudad: [this.empleadoSeleccionado.usuario.direccion.direccion.ciudad.nombre, [Validators.required]],
    });

    this.paisForm = this.fb.group({
      id: [],
      nombre: [this.empleadoSeleccionado.usuario.direccion.direccion.ciudad.provicia.pais.nombre, [Validators.required]],
    });

    this.provinciaForm = this.fb.group({
      id: [],
      nombre: [this.empleadoSeleccionado.usuario.direccion.direccion.ciudad.provicia.nombre, [Validators.required]],
      pais: [this.empleadoSeleccionado.usuario.direccion.direccion.ciudad.provicia.pais.id, [Validators.required]],
    });

    this.ciudadForm = this.fb.group({
      id: [],
      nombre: [this.empleadoSeleccionado.usuario.direccion.direccion.ciudad.nombre, [Validators.required]],
      provincia: [this.empleadoSeleccionado.usuario.direccion.direccion.ciudad.provicia.id, [Validators.required]],
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
    const pais = this.createPaisFromForm();
    const provincia = this.createProvinciaFromForm(pais);
    const ciudad = this.createCiudadesFromForm(provincia);
    const direcciones = this.createDireccionesFromForm(ciudad);

    const empleado = new EmpleadoRegistroDto(empleados, direcciones, pais, provincia);

    this.subscribeToSaveResponse(this.empleadosService.createEmpReg(empleado));
  }

  // Creo las instancias que necesito

  private createContactoFromForm(): ITipoContactos {
    return {
      ...new TipoContactos(),
      id: this.contactoForm.get(['id'])?.value,
      descripcion: this.contactoForm.get(['descripcion'])?.value,
      tipoDocumento: this.contactoForm.get(['tipoDocumento'])?.value,
    };
  }

  private createPaisFromForm(): IPaises {
    return {
      ...new Paises(),
      id: this.paisForm.get(['id'])?.value,
      nombre: this.paisForm.get(['nombre'])?.value,
    };
  }

  private createProvinciaFromForm(pais: Paises): IProvincias {
    return {
      ...new Provincias(),
      id: this.provinciaForm.get(['id'])?.value,
      nombre: this.provinciaForm.get(['nombre'])?.value,
      pais,
    };
  }

  private createCiudadesFromForm(provincia: Provincias): ICiudades {
    return {
      ...new Ciudades(),
      id: this.ciudadForm.get(['id'])?.value,
      nombre: this.ciudadForm.get(['nombre'])?.value,
      provicia: provincia,
    };
  }

  private createDireccionesFromForm(ciudad: Ciudades): IDirecciones {
    return {
      ...new Direcciones(),
      id: this.direccionesForm.get(['id'])?.value,
      calle: this.direccionesForm.get(['calle'])?.value,
      altura: this.direccionesForm.get(['altura'])?.value,
      piso: this.direccionesForm.get(['piso'])?.value,
      departamento: this.direccionesForm.get(['departamento'])?.value,
      ciudad,
    };
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
      contacto: this.createContactoFromForm(),
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

  setTipoDoc(tipoDoc: any): void {
    this.contactoForm.controls['tipoDocumentos'].setValue(tipoDoc);
  }

  setProvincias(country: any): void {
    this.paisForm.controls['nombre'].setValue(country);
    country = this.paises?.filter(x => x.nombre === country);
    this.provinciasService.getByCountry(country[0].id).subscribe((res: HttpResponse<IProvincias[]>) => {
      this.provincias = res.body || [];
    });
  }

  setCiudades(state: any): void {
    this.ciudadForm.controls['nombre'].setValue(state);
  }

  setProvForm(provincia: any): void {
    provincia = this.provincias.filter((x: any) => x.nombre === provincia);
    this.ciudadesService.getByState(provincia[0].id).subscribe((res: HttpResponse<ICiudades[]>) => {
      this.ciudades = res.body || [];
    });

    this.provinciaForm.controls['nombre'].setValue(provincia[0].nombre);
  }

  setAltura(altura: any): void {
    this.direccionesForm.controls['altura'].setValue(altura);
  }
  setPiso(piso: any): void {
    this.direccionesForm.controls['piso'].setValue(piso);
  }
  setDepartamento(depto: any): void {
    this.direccionesForm.controls['departamento'].setValue(depto);
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
/* eslint-enable no-console */
