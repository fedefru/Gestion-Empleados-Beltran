/* eslint-disable no-console */
/* eslint-disable */

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { ITipoDocumentos } from '../../shared/model/tipo-documentos.model';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';
import { LoginModalService } from '../../../app/core/login/login-modal.service';
import { RegistroService } from './registro.service';
import { TipoDocumentosService } from '../tipo-documentos/tipo-documentos.service';

import { EmpresaDto, IEmpresaDto } from '../../shared/model/empresa-dto.model';
import { countries } from '../listado/countries';
import { ITipoContactos, TipoContactos } from 'app/shared/model/tipo-contactos.model';
import { IPaises, Paises } from 'app/shared/model/paises.model';
import { PaisesService } from '../paises/paises.service';
import { ProvinciasService } from '../provincias/provincias.service';
import { CiudadesService } from '../ciudades/ciudades.service';
import { IProvincias, Provincias } from 'app/shared/model/provincias.model';
import { Ciudades, ICiudades } from 'app/shared/model/ciudades.model';
import { Direcciones, IDirecciones } from 'app/shared/model/direcciones.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  habilitarPaso?: boolean = false;
  tipodocumentos?: ITipoDocumentos[];
  coincidenPass!: any;
  linear: boolean = true;
  isSaving?: boolean;

  paises?: IPaises[];
  provincias?: any;
  ciudades?: ICiudades[];

  registerForm = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
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

  empresaForm = this.fb.group({
    id: [],
    nombre: ['', [Validators.required]],
    clave: ['', [Validators.required]],
    direccion: [],
    contacto: [],
    estado: [],
  });

  constructor(
    private languageService: JhiLanguageService,
    private loginModalService: LoginModalService,
    private registroService: RegistroService,
    private fb: FormBuilder,
    private tipoDocumentosService: TipoDocumentosService,
    private paisesService: PaisesService,
    private provinciasService: ProvinciasService,
    private ciudadesService: CiudadesService
  ) {
    this.coincidenPass = null;
  }

  ngOnInit(): void {
    this.tipoDocumentosService.query().subscribe((res: HttpResponse<ITipoDocumentos[]>) => (this.tipodocumentos = res.body || []));

    this.paisesService.getAll().subscribe((res: HttpResponse<IPaises[]>) => {
      this.paises = res.body || [];
      console.log(this.paises);
    });
  }

  setProvincias(country: any): void {
    console.log(country);
    this.paisForm.controls['nombre'].setValue(country);
    country = this.paises?.filter(x => x.nombre == country);
    this.provinciasService.getByCountry(country[0].id).subscribe((res: HttpResponse<IProvincias[]>) => {
      this.provincias = res.body || [];
    });
  }

  setCiudades(state: any): void {
    this.ciudadForm.controls['nombre'].setValue(state);
  }

  setProvForm(provincia: any): void {
    provincia = this.provincias.filter((x: any) => x.nombre == provincia);
    this.ciudadesService.getByState(provincia[0].id).subscribe((res: HttpResponse<ICiudades[]>) => {
      this.ciudades = res.body || [];
      console.log(this.ciudades);
    });

    this.provinciaForm.controls['nombre'].setValue(provincia[0].nombre);
  }

  setTipoDoc(tipoDoc: any): void {
    this.contactoForm.controls['tipoDocumentos'].setValue(tipoDoc);
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
  setNombreEmpresa(nombre: any): void {
    this.empresaForm.controls['nombre'].setValue(nombre);
  }
  setClave(clave: any): void {
    this.empresaForm.controls['clave'].setValue(clave);
  }
  checkPasswords(clave: string, confirmaClave: string) {
    this.coincidenPass = clave === confirmaClave;
  }

  showItems(): void {
    console.log(
      'elementos=> ',
      this.direccionesForm.get(['altura'])?.value,
      this.direccionesForm.get(['piso'])?.value,
      this.direccionesForm.get(['departamento'])?.value
    );
  }

  openLogin(): void {
    this.loginModalService.open();
  }

  siguientePaso(): void {
    this.habilitarPaso = true;
    console.log(this.registerForm);
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }

  // Creo las instancias que necesito mandar al DTO

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
      pais: pais,
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
      ciudad: ciudad,
    };
  }

  // Genero el save que instancia todas las entidades y las incluye al dto para hacer el save

  save(): void {
    console.log();
    this.isSaving = true;
    const nombre = this.empresaForm.get(['nombre'])?.value;
    const clave = this.empresaForm.get(['clave'])?.value;
    const contactos = this.createContactoFromForm();
    const pais = this.createPaisFromForm();
    const provincia = this.createProvinciaFromForm(pais);
    const ciudad = this.createCiudadesFromForm(provincia);
    const direcciones = this.createDireccionesFromForm(ciudad);

    const empresa = new EmpresaDto(nombre, clave, contactos, pais, provincia, ciudad, direcciones);

    this.subscribeToSaveResponse(this.registroService.create(empresa));
  }

  // Promesas para registrar el DTO

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpresaDto>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}

/* eslint-enable no-console */
