/* eslint-disable no-console */

import { Component, OnInit } from '@angular/core';
import { FichajesService } from '../fichajes.service';
import { HttpResponse } from '@angular/common/http';
import { AccountService } from '../../../core/auth/account.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { IFichajes } from 'app/shared/model/fichajes.model';

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

  constructor(protected fichajesService: FichajesService, protected accountService: AccountService, private fb: FormBuilder) {
    this.informacion = [];
    this.atencion = true;
    this.exito = false;
    this.spinner = false;
    this.error = false;
    this.formateDate = ''
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.cuenta = account!.login;
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
          this.isSaving = true;
          console.log(this.informacion);
          this.subscribeToSaveResponse(this.fichajesService.create({'id': undefined, 'fichaje': this.informacion['time'], 'accion': 'ingreso'}));
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
