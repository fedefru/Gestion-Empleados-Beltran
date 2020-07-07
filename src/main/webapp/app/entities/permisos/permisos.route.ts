import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPermisos, Permisos } from 'app/shared/model/permisos.model';
import { PermisosService } from './permisos.service';
import { PermisosComponent } from './permisos.component';
import { PermisosDetailComponent } from './permisos-detail.component';
import { PermisosUpdateComponent } from './permisos-update.component';

@Injectable({ providedIn: 'root' })
export class PermisosResolve implements Resolve<IPermisos> {
  constructor(private service: PermisosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPermisos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((permisos: HttpResponse<Permisos>) => {
          if (permisos.body) {
            return of(permisos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Permisos());
  }
}

export const permisosRoute: Routes = [
  {
    path: '',
    component: PermisosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.permisos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PermisosDetailComponent,
    resolve: {
      permisos: PermisosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.permisos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PermisosUpdateComponent,
    resolve: {
      permisos: PermisosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.permisos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PermisosUpdateComponent,
    resolve: {
      permisos: PermisosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.permisos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
