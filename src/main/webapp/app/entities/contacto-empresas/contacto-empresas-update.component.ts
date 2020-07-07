import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContactoEmpresas, ContactoEmpresas } from 'app/shared/model/contacto-empresas.model';
import { ContactoEmpresasService } from './contacto-empresas.service';
import { ITipoContactos } from 'app/shared/model/tipo-contactos.model';
import { TipoContactosService } from 'app/entities/tipo-contactos/tipo-contactos.service';

@Component({
  selector: 'jhi-contacto-empresas-update',
  templateUrl: './contacto-empresas-update.component.html',
})
export class ContactoEmpresasUpdateComponent implements OnInit {
  isSaving = false;
  tipocontactos: ITipoContactos[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    contacto: [],
  });

  constructor(
    protected contactoEmpresasService: ContactoEmpresasService,
    protected tipoContactosService: TipoContactosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactoEmpresas }) => {
      this.updateForm(contactoEmpresas);

      this.tipoContactosService.query().subscribe((res: HttpResponse<ITipoContactos[]>) => (this.tipocontactos = res.body || []));
    });
  }

  updateForm(contactoEmpresas: IContactoEmpresas): void {
    this.editForm.patchValue({
      id: contactoEmpresas.id,
      nombre: contactoEmpresas.nombre,
      contacto: contactoEmpresas.contacto,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contactoEmpresas = this.createFromForm();
    if (contactoEmpresas.id !== undefined) {
      this.subscribeToSaveResponse(this.contactoEmpresasService.update(contactoEmpresas));
    } else {
      this.subscribeToSaveResponse(this.contactoEmpresasService.create(contactoEmpresas));
    }
  }

  private createFromForm(): IContactoEmpresas {
    return {
      ...new ContactoEmpresas(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      contacto: this.editForm.get(['contacto'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactoEmpresas>>): void {
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

  trackById(index: number, item: ITipoContactos): any {
    return item.id;
  }
}
