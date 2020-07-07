import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEntidadesEmpresas, EntidadesEmpresas } from 'app/shared/model/entidades-empresas.model';
import { EntidadesEmpresasService } from './entidades-empresas.service';
import { EntidadesEmpresasComponent } from './entidades-empresas.component';
import { EntidadesEmpresasDetailComponent } from './entidades-empresas-detail.component';
import { EntidadesEmpresasUpdateComponent } from './entidades-empresas-update.component';

@Injectable({ providedIn: 'root' })
export class EntidadesEmpresasResolve implements Resolve<IEntidadesEmpresas> {
  constructor(private service: EntidadesEmpresasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntidadesEmpresas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((entidadesEmpresas: HttpResponse<EntidadesEmpresas>) => {
          if (entidadesEmpresas.body) {
            return of(entidadesEmpresas.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EntidadesEmpresas());
  }
}

export const entidadesEmpresasRoute: Routes = [
  {
    path: '',
    component: EntidadesEmpresasComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.entidadesEmpresas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntidadesEmpresasDetailComponent,
    resolve: {
      entidadesEmpresas: EntidadesEmpresasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.entidadesEmpresas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntidadesEmpresasUpdateComponent,
    resolve: {
      entidadesEmpresas: EntidadesEmpresasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.entidadesEmpresas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntidadesEmpresasUpdateComponent,
    resolve: {
      entidadesEmpresas: EntidadesEmpresasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.entidadesEmpresas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
