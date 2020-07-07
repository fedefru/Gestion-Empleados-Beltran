import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEstados, Estados } from 'app/shared/model/estados.model';
import { EstadosService } from './estados.service';
import { EstadosComponent } from './estados.component';
import { EstadosDetailComponent } from './estados-detail.component';
import { EstadosUpdateComponent } from './estados-update.component';

@Injectable({ providedIn: 'root' })
export class EstadosResolve implements Resolve<IEstados> {
  constructor(private service: EstadosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstados> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((estados: HttpResponse<Estados>) => {
          if (estados.body) {
            return of(estados.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Estados());
  }
}

export const estadosRoute: Routes = [
  {
    path: '',
    component: EstadosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.estados.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstadosDetailComponent,
    resolve: {
      estados: EstadosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.estados.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstadosUpdateComponent,
    resolve: {
      estados: EstadosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.estados.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstadosUpdateComponent,
    resolve: {
      estados: EstadosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.estados.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
