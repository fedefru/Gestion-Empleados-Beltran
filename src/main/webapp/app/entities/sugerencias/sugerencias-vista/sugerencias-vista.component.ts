/* eslint-disable no-console */

import { Component, OnInit } from '@angular/core';
import { SugerenciasService } from '../sugerencias.service';
import { HttpResponse } from '@angular/common/http';
import { IUsuarios } from 'app/shared/model/usuarios.model';
import { AccountService } from '../../../core/auth/account.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { Observable } from 'rxjs/internal/Observable';
import { ISugerencias, Sugerencias } from '../../../shared/model/sugerencias.model';
import { EmpresasService } from 'app/entities/empresas/empresas.service';
import { EmpleadosService } from 'app/entities/empleados/empleados.service';
import { Empleados, IEmpleados } from 'app/shared/model/empleados.model';

@Component({
  selector: 'jhi-sugerencias-vista',
  templateUrl: './sugerencias-vista.component.html',
  styleUrls: ['./sugerencias-vista.component.scss'],
})
export class SugerenciasVistaComponent implements OnInit {
  isSaving = false;
  sugerencias?: any;
  cuenta: any;
  usuario!: IUsuarios;
  sugerencia!: any;
  empresaLogueada: any;
  empleados: IEmpleados[] = [];
  sugerenciasFiltrados: Array<Sugerencias> = [];

  test: any = false;
  constructor(
    protected sugerenciasService: SugerenciasService,
    protected empresasService: EmpresasService,
    protected empleadosService: EmpleadosService,
    protected accountService: AccountService,
    protected usuarioService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.cuenta = account!.login;
    });

    this.usuarioService.findUsuarioByAlias(this.cuenta.toLowerCase()).subscribe((resp: HttpResponse<any>) => {
      this.usuario = resp.body;
    });

    this.empleadosService.findAll().subscribe((res: any) => {
      this.empresasService.findByUsuario(this.cuenta).subscribe((empresa: any) => {
        this.empresaLogueada = empresa.body;
        this.empleados = res.body;
        console.clear();

        console.log('Empleados sin filtrar => ', this.empleados);
        if (this.empresaLogueada) {
          console.log('Empresa ', this.empresaLogueada['id']);
          this.empleados = this.empleados.filter(empleado => {
            console.log(typeof empleado.empresa!.id, typeof this.empresaLogueada['id']);
            console.log(empleado.empresa!.id === this.empresaLogueada['id']);
            return empleado.empresa!.id === this.empresaLogueada['id'];
          });
        }
        console.log('Empleados filtrados => ', this.empleados);

        this.sugerenciasService.query().subscribe((respuesta: HttpResponse<any>) => {
          this.sugerencias = respuesta.body;

          console.log('sugerencias sin filtro => ', this.sugerencias, ' El largo de empleados => ', this.empleados.length);

          this.empleados.forEach((emp: Empleados) => {
            this.sugerencias.forEach((sug: any) => {
              if (emp.usuario?.id === sug.usuario?.id) {
                console.log(emp.usuario?.id, sug.usuario?.id);
                console.log(sug);
                this.sugerenciasFiltrados?.push(sug);
                console.log('sugerencias con filtro => ', this.sugerenciasFiltrados);
              }
            });
          });
        });
      });
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

  eliminarSugerencia(id: number): void {
    this.sugerenciasService.delete(id).subscribe(() => {
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
