import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEntidadesUsuarios, EntidadesUsuarios } from 'app/shared/model/entidades-usuarios.model';
import { EntidadesUsuariosService } from './entidades-usuarios.service';
import { EntidadesUsuariosComponent } from './entidades-usuarios.component';
import { EntidadesUsuariosDetailComponent } from './entidades-usuarios-detail.component';
import { EntidadesUsuariosUpdateComponent } from './entidades-usuarios-update.component';

@Injectable({ providedIn: 'root' })
export class EntidadesUsuariosResolve implements Resolve<IEntidadesUsuarios> {
  constructor(private service: EntidadesUsuariosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntidadesUsuarios> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((entidadesUsuarios: HttpResponse<EntidadesUsuarios>) => {
          if (entidadesUsuarios.body) {
            return of(entidadesUsuarios.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EntidadesUsuarios());
  }
}

export const entidadesUsuariosRoute: Routes = [
  {
    path: '',
    component: EntidadesUsuariosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.entidadesUsuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntidadesUsuariosDetailComponent,
    resolve: {
      entidadesUsuarios: EntidadesUsuariosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.entidadesUsuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntidadesUsuariosUpdateComponent,
    resolve: {
      entidadesUsuarios: EntidadesUsuariosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.entidadesUsuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntidadesUsuariosUpdateComponent,
    resolve: {
      entidadesUsuarios: EntidadesUsuariosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.entidadesUsuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
