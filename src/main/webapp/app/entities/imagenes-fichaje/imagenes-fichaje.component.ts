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
import { EmpresasService } from '../empresas/empresas.service';
import { Empresas } from 'app/shared/model/empresas.model';
import { IEmpleados } from 'app/shared/model/empleados.model';
import { EmpleadosService } from '../empleados/empleados.service';

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
  fechas?: Array<[]> = [];
  horas?: Array<[]> = [];
  regex: any;
  allImg?: string[] = [];
  usuarios: IUsuarios[] = [];
  filter!: boolean;
  imagenes?: any;
  roles: any;
  inicial: boolean;
  empresaLogueada?: any;
  empleados?: IEmpleados[];
  noTieneFichajesEmpleados!: boolean;

  constructor(
    protected imagenesFichajeService: ImagenesFichajeService,
    protected accountService: AccountService,
    protected usuarioService: UsuariosService,
    protected empresasService: EmpresasService,
    protected loginService: LoginService,
    private loginModalService: LoginModalService,
    protected empleadosService: EmpleadosService,
    protected userService: UserService,
    private router: Router
  ) {
    this.server = 'http://localhost:5000/get_image?filename=';
    this.regex = /-/gi;
    this.filter = false;
    this.inicial = true;
    this.noTieneFichajesEmpleados = false;
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.cuenta = account!.login;
      this.roles = account!.authorities[0];
    });

    // Obtengo la empresa Logueada, si es que es empresa
    this.empresasService.findByUsuario(this.cuenta).subscribe(empresa => {
      this.empresaLogueada = empresa.body;
    });

    this.empleadosService.findAll().subscribe((resp: HttpResponse<any>) => {
      this.empleados = resp.body;

      console.clear();

      console.log('Empleados sin filtrar => ', this.empleados);
      if (this.empresaLogueada !== undefined && this.empleados !== undefined) {
        console.log('Empresa ', this.empresaLogueada['id']);
        this.empleados = this.empleados.filter(empleado => {
          return empleado.empresa!.id === this.empresaLogueada['id'];
        });
      }

      this.empleados?.length === 0 ? (this.noTieneFichajesEmpleados = false) : (this.noTieneFichajesEmpleados = true);

      console.log('Empleados filtrados => ', this.empleados);
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
    this.horas = [];
    this.fechas = [];
    this.inicial = true;
    // Cargo a todos los usuarios
    if (this.roles === 'ROLE_EMPRESA') {
      this.usuarioService.getAll().subscribe((res: HttpResponse<any>) => {
        this.usuarios = res.body;

        // Ejecuto una llamada al servicio por cada usuario que tenga para traer sus imagenes
        this.usuarios.map(user => {
          this.imagenesFichajeService.queryImagenes(user.id).subscribe((resImg: HttpResponse<any>) => {
            // Cargo en allImg las imagenes que recibo
            this.allImg?.push(resImg.body);
            // Filtro los array.. vacios
            this.allImg = this.allImg?.filter(x => x.length > 0);
            if (this.allImg !== undefined) {
              this.allImg.forEach((imgArray: any) => {
                imgArray.forEach((img: any) => {
                  this.fechas?.push(img.substring(img.lastIndexOf('_') + 1, img.lastIndexOf('T')));
                });
              });

              this.allImg.forEach((dato: any) => {
                dato.forEach((hr: any) => {
                  hr = hr.substring(hr.lastIndexOf('T') + 1, hr.lastIndexOf('.'));
                  this.horas?.push(hr.replace(this.regex, ':'));
                });
              });
              console.log('Todas mis img=> ', this.allImg);
            }
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
      this.inicial = false;

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
