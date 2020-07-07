import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGrupoUsuarios, GrupoUsuarios } from 'app/shared/model/grupo-usuarios.model';
import { GrupoUsuariosService } from './grupo-usuarios.service';
import { GrupoUsuariosComponent } from './grupo-usuarios.component';
import { GrupoUsuariosDetailComponent } from './grupo-usuarios-detail.component';
import { GrupoUsuariosUpdateComponent } from './grupo-usuarios-update.component';

@Injectable({ providedIn: 'root' })
export class GrupoUsuariosResolve implements Resolve<IGrupoUsuarios> {
  constructor(private service: GrupoUsuariosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGrupoUsuarios> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((grupoUsuarios: HttpResponse<GrupoUsuarios>) => {
          if (grupoUsuarios.body) {
            return of(grupoUsuarios.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GrupoUsuarios());
  }
}

export const grupoUsuariosRoute: Routes = [
  {
    path: '',
    component: GrupoUsuariosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.grupoUsuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GrupoUsuariosDetailComponent,
    resolve: {
      grupoUsuarios: GrupoUsuariosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.grupoUsuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GrupoUsuariosUpdateComponent,
    resolve: {
      grupoUsuarios: GrupoUsuariosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.grupoUsuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GrupoUsuariosUpdateComponent,
    resolve: {
      grupoUsuarios: GrupoUsuariosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.grupoUsuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
