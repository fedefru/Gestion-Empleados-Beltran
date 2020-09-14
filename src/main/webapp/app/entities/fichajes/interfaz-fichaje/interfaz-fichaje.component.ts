/* eslint-disable no-console */

import { Component, OnInit } from '@angular/core';
import { FichajesService } from '../fichajes.service';
import { HttpResponse } from '@angular/common/http';
import { AccountService } from '../../../core/auth/account.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { IFichajes } from 'app/shared/model/fichajes.model';
import { IUsuarios } from '../../../shared/model/usuarios.model';
import { UsuariosService } from '../../usuarios/usuarios.service';

@Component({
  selector: 'jhi-interfaz-fichaje',
  templateUrl: './interfaz-fichaje.component.html',
  styleUrls: ['./interfaz-fichaje.component.scss'],
})
export class InterfazFichajeComponent implements OnInit {
  informacion: string[];
  atencion: boolean;
  exito: boolean;
  spinner: boolean;
  error: boolean;
  isSaving = false;
  cuenta: any;
  formateDate: string;
  usuario!: IUsuarios;

  constructor(
    protected fichajesService: FichajesService,
    protected accountService: AccountService,
    protected usuarioService: UsuariosService,
    private fb: FormBuilder
  ) {
    this.informacion = [];
    this.atencion = true;
    this.exito = false;
    this.spinner = false;
    this.error = false;
    this.formateDate = '';
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      console.log(account);
      this.cuenta = account!.login;
    });

    this.usuarioService.findUsuarioByAlias(this.cuenta.toLowerCase()).subscribe((resp: HttpResponse<any>) => {
      this.usuario = resp.body;
      console.log('Usuario encontrado: ', this.usuario);
    });
  }

  activarReconocimiento(): void {
    this.atencion = false;
    this.error = false;
    this.spinner = true;

    this.fichajesService.reconocerRostro().subscribe((res: HttpResponse<any>) => {
      this.informacion = res.body || [];

      if (this.informacion['code'] === '200') {
        this.spinner = false;
        this.atencion = false;
        this.exito = true;

        if (this.cuenta.toLowerCase() === this.informacion['body'].toLowerCase()) {
          if (this.usuario) {
            this.isSaving = true;

            console.log(this.informacion);
            this.subscribeToSaveResponse(
              this.fichajesService.create({ id: undefined, fichaje: this.informacion['time'], accion: 'ingreso', usuario: this.usuario })
            );
          } else {
            console.log('usuario vacio');
          }
        } else {
          alert('No puedes registrar en nombre del Usuario logueado.');
        }
      } else {
        this.spinner = false;
        this.atencion = false;
        this.error = true;
      }
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFichajes>>): void {
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

  previousState(): void {
    window.history.back();
  }
}

/* eslint-enable no-console */
