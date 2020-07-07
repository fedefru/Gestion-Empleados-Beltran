import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPermisosGrupos, PermisosGrupos } from 'app/shared/model/permisos-grupos.model';
import { PermisosGruposService } from './permisos-grupos.service';
import { PermisosGruposComponent } from './permisos-grupos.component';
import { PermisosGruposDetailComponent } from './permisos-grupos-detail.component';
import { PermisosGruposUpdateComponent } from './permisos-grupos-update.component';

@Injectable({ providedIn: 'root' })
export class PermisosGruposResolve implements Resolve<IPermisosGrupos> {
  constructor(private service: PermisosGruposService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPermisosGrupos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((permisosGrupos: HttpResponse<PermisosGrupos>) => {
          if (permisosGrupos.body) {
            return of(permisosGrupos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PermisosGrupos());
  }
}

export const permisosGruposRoute: Routes = [
  {
    path: '',
    component: PermisosGruposComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.permisosGrupos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PermisosGruposDetailComponent,
    resolve: {
      permisosGrupos: PermisosGruposResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.permisosGrupos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PermisosGruposUpdateComponent,
    resolve: {
      permisosGrupos: PermisosGruposResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.permisosGrupos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PermisosGruposUpdateComponent,
    resolve: {
      permisosGrupos: PermisosGruposResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.permisosGrupos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
