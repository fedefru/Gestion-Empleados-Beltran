/* eslint-disable no-console */

import { Component, OnInit } from '@angular/core';
import { SugerenciasService } from '../sugerencias.service';
import { HttpResponse } from '@angular/common/http';
import { IUsuarios } from 'app/shared/model/usuarios.model';
import { AccountService } from '../../../core/auth/account.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { Observable } from 'rxjs/internal/Observable';
import { ISugerencias } from '../../../shared/model/sugerencias.model';

@Component({
  selector: 'jhi-sugerencias-vista',
  templateUrl: './sugerencias-vista.component.html',
  styleUrls: ['./sugerencias-vista.component.scss'],
})
export class SugerenciasVistaComponent implements OnInit {
  isSaving = false;
  sugerencias!: any;
  cuenta: any;
  usuario!: IUsuarios;
  sugerencia!: any;

  constructor(
    protected sugerenciasService: SugerenciasService,
    protected accountService: AccountService,
    protected usuarioService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.sugerenciasService.query().subscribe((res: HttpResponse<any>) => {
      this.sugerencias = res.body;
    });

    this.accountService.identity().subscribe(account => {
      this.cuenta = account!.login;
    });

    this.usuarioService.findUsuarioByAlias(this.cuenta.toLowerCase()).subscribe((resp: HttpResponse<any>) => {
      this.usuario = resp.body;
    });
  }

  marcarComoLeido(id: number): void {
    this.sugerenciasService.find(id).subscribe((res: HttpResponse<any>) => {
      this.sugerencia = res.body;

      this.sugerencia.leido = true;

      this.subscribeToSaveResponse(this.sugerenciasService.update(this.sugerencia));
      window.location.reload();
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISugerencias>>): void {
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
