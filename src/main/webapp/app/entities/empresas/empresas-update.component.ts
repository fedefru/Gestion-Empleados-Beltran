import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEmpresas, Empresas } from 'app/shared/model/empresas.model';
import { EmpresasService } from './empresas.service';
import { ITipoDireccion } from 'app/shared/model/tipo-direccion.model';
import { TipoDireccionService } from 'app/entities/tipo-direccion/tipo-direccion.service';
import { ITipoContactos } from 'app/shared/model/tipo-contactos.model';
import { TipoContactosService } from 'app/entities/tipo-contactos/tipo-contactos.service';
import { IEstados } from 'app/shared/model/estados.model';
import { EstadosService } from 'app/entities/estados/estados.service';

type SelectableEntity = ITipoDireccion | ITipoContactos | IEstados;

@Component({
  selector: 'jhi-empresas-update',
  templateUrl: './empresas-update.component.html',
})
export class EmpresasUpdateComponent implements OnInit {
  isSaving = false;
  tipodireccions: ITipoDireccion[] = [];
  tipocontactos: ITipoContactos[] = [];
  estados: IEstados[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    direccion: [],
    contacto: [],
    estado: [],
  });

  constructor(
    protected empresasService: EmpresasService,
    protected tipoDireccionService: TipoDireccionService,
    protected tipoContactosService: TipoContactosService,
    protected estadosService: EstadosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empresas }) => {
      this.updateForm(empresas);

      this.tipoDireccionService.query().subscribe((res: HttpResponse<ITipoDireccion[]>) => (this.tipodireccions = res.body || []));

      this.tipoContactosService.query().subscribe((res: HttpResponse<ITipoContactos[]>) => (this.tipocontactos = res.body || []));

      this.estadosService.query().subscribe((res: HttpResponse<IEstados[]>) => (this.estados = res.body || []));
    });
  }

  updateForm(empresas: IEmpresas): void {
    this.editForm.patchValue({
      id: empresas.id,
      nombre: empresas.nombre,
      direccion: empresas.direccion,
      contacto: empresas.contacto,
      estado: empresas.estado,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const empresas = this.createFromForm();
    if (empresas.id !== undefined) {
      this.subscribeToSaveResponse(this.empresasService.update(empresas));
    } else {
      this.subscribeToSaveResponse(this.empresasService.create(empresas));
    }
  }

  private createFromForm(): IEmpresas {
    return {
      ...new Empresas(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
      contacto: this.editForm.get(['contacto'])!.value,
      estado: this.editForm.get(['estado'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpresas>>): void {
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
