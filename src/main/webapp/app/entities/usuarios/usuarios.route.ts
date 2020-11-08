import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUsuarios, Usuarios } from 'app/shared/model/usuarios.model';
import { UsuariosService } from './usuarios.service';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosDetailComponent } from './usuarios-detail.component';
import { UsuariosUpdateComponent } from './usuarios-update.component';

@Injectable({ providedIn: 'root' })
export class UsuariosResolve implements Resolve<IUsuarios> {
  constructor(private service: UsuariosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUsuarios> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((usuarios: HttpResponse<Usuarios>) => {
          if (usuarios.body) {
            return of(usuarios.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Usuarios());
  }
}

export const usuariosRoute: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    data: {
      authorities: [Authority.EMPRESA],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEmpleadosApp.usuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UsuariosDetailComponent,
    resolve: {
      usuarios: UsuariosResolve,
    },
    data: {
      authorities: [Authority.EMPRESA],
      pageTitle: 'gestionEmpleadosApp.usuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UsuariosUpdateComponent,
    resolve: {
      usuarios: UsuariosResolve,
    },
    data: {
      authorities: [Authority.EMPRESA],
      pageTitle: 'gestionEmpleadosApp.usuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UsuariosUpdateComponent,
    resolve: {
      usuarios: UsuariosResolve,
    },
    data: {
      authorities: [Authority.EMPRESA],
      pageTitle: 'gestionEmpleadosApp.usuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
