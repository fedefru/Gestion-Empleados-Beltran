/* eslint-disable no-console */

import { Component, OnInit } from '@angular/core';
import { ImagenesFichajeService } from './imagenes-fichaje.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFichajes } from 'app/shared/model/fichajes.model';
import { Router } from '@angular/router';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { IUsuarios } from 'app/shared/model/usuarios.model';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginService } from 'app/core/login/login.service';

@Component({
  selector: 'jhi-imagenes-fichaje',
  templateUrl: './imagenes-fichaje.component.html',
  styleUrls: ['./imagenes-fichaje.component.scss'],
})
export class ImagenesFichajeComponent implements OnInit {

  isSaving = false;
  cuenta: any;
  usuario!: IUsuarios;
  server!: string;
  rutas?: any;
  fechas?: any;
  regex:any;

  constructor(
    protected imagenesFichajeService: ImagenesFichajeService,
    protected accountService: AccountService,
    protected usuarioService: UsuariosService,
    protected loginService: LoginService,
    private loginModalService: LoginModalService,
    private router: Router
  ) {
    
    this.server = 'http://localhost:5000/get_image?filename=./';
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.cuenta = account!.login;
    });

    this.usuarioService.findUsuarioByAlias(this.cuenta.toLowerCase()).subscribe((resp: HttpResponse<any>) => {
      this.usuario = resp.body;
      console.log(this.usuario)
      
      this.imagenesFichajeService.queryImagenes(this.usuario.id).subscribe((res: HttpResponse<any>) => {
        this.rutas = res.body;
        console.log(this.rutas);

        this.rutas.map( (x:any) => {
            this.fechas =  x.substring(
              x.lastIndexOf("_") + 1, 
              x.lastIndexOf("T"));
              
              /*
              temp1.map( x => {
              temp2 =  x.substring(
                x.lastIndexOf("_") + 1, 
                x.lastIndexOf("T"));
              });
              */
        });

      });
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

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
    this.loginModalService.open();
  }
}

/* eslint-enable no-console */
