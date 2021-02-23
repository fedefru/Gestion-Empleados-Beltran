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
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-imagenes-fichaje',
  templateUrl: './imagenes-fichaje.component.html',
  styleUrls: ['./imagenes-fichaje.component.scss'],
})
export class ImagenesFichajeComponent implements OnInit {
  isSaving = false;
  cuenta: any;
  usuario!: any;
  server!: string;
  rutas?: any;
  fechas?: any;
  horas?: any;
  regex: any;
  allImg?: string[] = [];
  usuarios: IUsuarios[] = [];
  filter!: boolean;
  imagenes?: any;
  roles: any;

  constructor(
    protected imagenesFichajeService: ImagenesFichajeService,
    protected accountService: AccountService,
    protected usuarioService: UsuariosService,
    protected loginService: LoginService,
    private loginModalService: LoginModalService,
    protected userService: UserService,
    private router: Router
  ) {
    this.server = 'http://localhost:5000/get_image?filename=';
    this.regex = /-/gi;
    this.filter = false;
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.cuenta = account!.login;
      this.roles = account!.authorities[0];
    });

    this.usuarioService.findUsuarioByAlias(this.cuenta.toLowerCase()).subscribe((resp: HttpResponse<any>) => {
      this.usuario = resp.body;

      this.imagenesFichajeService.queryImagenes(this.usuario.id).subscribe((res: HttpResponse<any>) => {
        this.rutas = res.body;

        this.fechas = this.rutas.map((x: any) => {
          return x.substring(x.lastIndexOf('_') + 1, x.lastIndexOf('T'));
        });

        this.horas = this.rutas.map((x: any) => {
          x = x.substring(x.lastIndexOf('T') + 1, x.lastIndexOf('.'));
          return x.replace(this.regex, ':');
        });
      });
    });
    this.loadAllImages();
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

  loadAllImages(): void {
    this.allImg = [];
    // Cargo a todos los usuarios
    if (this.roles === 'ROLE_EMPRESA') {
      this.usuarioService.getAll().subscribe((res: HttpResponse<any>) => {
        this.usuarios = res.body;

        // Ejecuto una llamada al servicio por cada usuario que tenga para traer sus imagenes
        this.usuarios.map(user => {
          this.imagenesFichajeService.queryImagenes(user.id).subscribe((resImg: HttpResponse<any>) => {
            this.allImg?.push(resImg.body);
            this.allImg = this.allImg?.filter(x => x.length > 0);
            console.log('LoadAllImages =>', this.allImg);
            this.fechas = this.allImg?.map((x: any) => {
              return x.substring(x.lastIndexOf('_') + 1, x.lastIndexOf('T'));
            });

            this.horas = this.allImg?.map((x: any) => {
              x = x.substring(x.lastIndexOf('T') + 1, x.lastIndexOf('.'));
              return x.replace(this.regex, ':');
            });
          });
        });
      });
    } else {
      this.imagenesFichajeService.queryImagenes(this.usuario.id).subscribe((resImg: HttpResponse<any>) => {
        this.allImg?.push(resImg.body);
        this.allImg = this.allImg?.filter(x => x.length > 0);
        console.log('LoadAllImages =>', this.allImg);

        this.fechas = this.allImg?.map((x: any) => {
          return x.substring(x.lastIndexOf('_') + 1, x.lastIndexOf('T'));
        });

        this.horas = this.allImg?.map((x: any) => {
          x = x.substring(x.lastIndexOf('T') + 1, x.lastIndexOf('.'));
          return x.replace(this.regex, ':');
        });
      });
    }
  }

  filterImg(user: string): void {
    if (user === 'null') {
      this.loadAllImages();
      this.usuario = undefined;
    } else {
      this.allImg = [];
      this.fechas = [];
      this.horas = [];

      this.usuarioService.findUsuarioByAlias(user).subscribe((resp: HttpResponse<any>) => {
        this.usuario = resp.body;

        this.imagenesFichajeService.queryImagenes(this.usuario.id).subscribe((res: HttpResponse<any>) => {
          this.allImg = res.body;
          console.log('Filter =>', this.allImg);
          this.fechas = this.allImg?.map((x: any) => {
            return x.substring(x.lastIndexOf('_') + 1, x.lastIndexOf('T'));
          });

          this.horas = this.allImg?.map((x: any) => {
            x = x.substring(x.lastIndexOf('T') + 1, x.lastIndexOf('.'));
            return x.replace(this.regex, ':');
          });
        });
      });
    }
  }
}

/* eslint-enable no-console */
