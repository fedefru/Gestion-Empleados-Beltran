import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoContactos, TipoContactos } from 'app/shared/model/tipo-contactos.model';
import { TipoContactosService } from './tipo-contactos.service';
import { TipoContactosComponent } from './tipo-contactos.component';
import { TipoContactosDetailComponent } from './tipo-contactos-detail.component';
import { TipoContactosUpdateComponent } from './tipo-contactos-update.component';

@Injectable({ providedIn: 'root' })
export class TipoContactosResolve implements Resolve<ITipoContactos> {
  constructor(private service: TipoContactosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoContactos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoContactos: HttpResponse<TipoContactos>) => {
          if (tipoContactos.body) {
            return of(tipoContactos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoContactos());
  }
}

export const tipoContactosRoute: Routes = [
  {
    path: '',
    component: TipoContactosComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEmpleadosApp.tipoContactos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoContactosDetailComponent,
    resolve: {
      tipoContactos: TipoContactosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.tipoContactos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoContactosUpdateComponent,
    resolve: {
      tipoContactos: TipoContactosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.tipoContactos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoContactosUpdateComponent,
    resolve: {
      tipoContactos: TipoContactosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.tipoContactos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
