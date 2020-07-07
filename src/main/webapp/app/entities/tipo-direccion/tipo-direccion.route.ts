import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoDireccion, TipoDireccion } from 'app/shared/model/tipo-direccion.model';
import { TipoDireccionService } from './tipo-direccion.service';
import { TipoDireccionComponent } from './tipo-direccion.component';
import { TipoDireccionDetailComponent } from './tipo-direccion-detail.component';
import { TipoDireccionUpdateComponent } from './tipo-direccion-update.component';

@Injectable({ providedIn: 'root' })
export class TipoDireccionResolve implements Resolve<ITipoDireccion> {
  constructor(private service: TipoDireccionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoDireccion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoDireccion: HttpResponse<TipoDireccion>) => {
          if (tipoDireccion.body) {
            return of(tipoDireccion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoDireccion());
  }
}

export const tipoDireccionRoute: Routes = [
  {
    path: '',
    component: TipoDireccionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.tipoDireccion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoDireccionDetailComponent,
    resolve: {
      tipoDireccion: TipoDireccionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.tipoDireccion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoDireccionUpdateComponent,
    resolve: {
      tipoDireccion: TipoDireccionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.tipoDireccion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoDireccionUpdateComponent,
    resolve: {
      tipoDireccion: TipoDireccionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.tipoDireccion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
