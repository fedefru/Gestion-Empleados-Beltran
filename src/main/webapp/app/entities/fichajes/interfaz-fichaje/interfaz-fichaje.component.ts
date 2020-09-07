/* eslint-disable no-console */

import { Component, OnInit } from '@angular/core';
import { FichajesService } from '../fichajes.service';
import { HttpResponse } from '@angular/common/http';
import { AccountService } from '../../../core/auth/account.service';
import { FormBuilder } from '@angular/forms';

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

  cuenta: any;

  constructor(protected fichajesService: FichajesService, protected accountService: AccountService, private fb: FormBuilder) {
    this.informacion = [];
    this.atencion = true;
    this.exito = false;
    this.spinner = false;
    this.error = false;
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

        if (this.cuenta === this.informacion['body']) {
          console.log('nombre coinciden');
        } else {
          console.log('mal ahi bro');
          console.log('nombrePY', this.informacion['body']);
          console.log('nombreAN', this.cuenta);
        }
      } else {
        this.spinner = false;
        this.atencion = false;
        this.error = true;
      }
    });
  }
}
/* eslint-enable no-console */
