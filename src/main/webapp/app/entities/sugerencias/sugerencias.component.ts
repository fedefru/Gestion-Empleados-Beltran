import { Component, OnInit } from '@angular/core';
import { SugerenciasService } from './sugerencias.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ISugerencias, Sugerencias } from '../../shared/model/sugerencias.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AccountService } from 'app/core/auth/account.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginService } from 'app/core/login/login.service';
import { IUsuarios } from '../../shared/model/usuarios.model';

@Component({
  selector: 'jhi-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.scss'],
})
export class SugerenciasComponent implements OnInit {
  isSaving = false;
  leido = false;
  cuenta: any;
  usuario!: IUsuarios;

  editForm = this.fb.group({
    id: [],
    asunto: [],
    prioridad: [],
    mensaje: [],
  });

  constructor(
    protected sugerenciasService: SugerenciasService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected accountService: AccountService,
    protected usuarioService: UsuariosService,
    protected loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.cuenta = account!.login;
    });

    this.usuarioService.findUsuarioByAlias(this.cuenta.toLowerCase()).subscribe((resp: HttpResponse<any>) => {
      this.usuario = resp.body;
    });

    /* this.activatedRoute.data.subscribe(({sugerencias}) => {
      this.updateForm(sugerencias);
    }) */
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sugerencias = this.createFromForm();

    this.subscribeToSaveResponse(this.sugerenciasService.create(sugerencias));
  }

  private createFromForm(): ISugerencias {
    return {
      ...new Sugerencias(),
      id: this.editForm.get(['id'])!.value,
      asunto: this.editForm.get(['asunto'])!.value,
      prioridad: this.editForm.get(['prioridad'])!.value,
      mensaje: this.editForm.get(['mensaje'])!.value,
      leido: this.leido,
      usuario: this.usuario,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISugerencias>>): void {
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
}
