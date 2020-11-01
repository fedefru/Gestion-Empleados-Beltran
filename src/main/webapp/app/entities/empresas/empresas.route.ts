import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEmpresas, Empresas } from 'app/shared/model/empresas.model';
import { EmpresasService } from './empresas.service';
import { EmpresasComponent } from './empresas.component';
import { EmpresasDetailComponent } from './empresas-detail.component';
import { EmpresasUpdateComponent } from './empresas-update.component';

@Injectable({ providedIn: 'root' })
export class EmpresasResolve implements Resolve<IEmpresas> {
  constructor(private service: EmpresasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmpresas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((empresas: HttpResponse<Empresas>) => {
          if (empresas.body) {
            return of(empresas.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Empresas());
  }
}

export const empresasRoute: Routes = [
  {
    path: '',
    component: EmpresasComponent,
    data: {
      authorities: [Authority.ADMIN],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEmpleadosApp.empresas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmpresasDetailComponent,
    resolve: {
      empresas: EmpresasResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gestionEmpleadosApp.empresas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmpresasUpdateComponent,
    resolve: {
      empresas: EmpresasResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gestionEmpleadosApp.empresas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmpresasUpdateComponent,
    resolve: {
      empresas: EmpresasResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gestionEmpleadosApp.empresas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
