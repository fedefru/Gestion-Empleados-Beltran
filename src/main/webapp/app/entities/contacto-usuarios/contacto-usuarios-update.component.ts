import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContactoUsuarios, ContactoUsuarios } from 'app/shared/model/contacto-usuarios.model';
import { ContactoUsuariosService } from './contacto-usuarios.service';
import { ITipoContactos } from 'app/shared/model/tipo-contactos.model';
import { TipoContactosService } from 'app/entities/tipo-contactos/tipo-contactos.service';

@Component({
  selector: 'jhi-contacto-usuarios-update',
  templateUrl: './contacto-usuarios-update.component.html',
})
export class ContactoUsuariosUpdateComponent implements OnInit {
  isSaving = false;
  tipocontactos: ITipoContactos[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    contacto: [],
  });

  constructor(
    protected contactoUsuariosService: ContactoUsuariosService,
    protected tipoContactosService: TipoContactosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactoUsuarios }) => {
      this.updateForm(contactoUsuarios);

      this.tipoContactosService.query().subscribe((res: HttpResponse<ITipoContactos[]>) => (this.tipocontactos = res.body || []));
    });
  }

  updateForm(contactoUsuarios: IContactoUsuarios): void {
    this.editForm.patchValue({
      id: contactoUsuarios.id,
      nombre: contactoUsuarios.nombre,
      contacto: contactoUsuarios.contacto,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contactoUsuarios = this.createFromForm();
    if (contactoUsuarios.id !== undefined) {
      this.subscribeToSaveResponse(this.contactoUsuariosService.update(contactoUsuarios));
    } else {
      this.subscribeToSaveResponse(this.contactoUsuariosService.create(contactoUsuarios));
    }
  }

  private createFromForm(): IContactoUsuarios {
    return {
      ...new ContactoUsuarios(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      contacto: this.editForm.get(['contacto'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactoUsuarios>>): void {
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
