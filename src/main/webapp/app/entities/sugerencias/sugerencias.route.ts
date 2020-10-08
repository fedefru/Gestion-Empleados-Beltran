import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from '../../../app/shared/constants/authority.constants';
import { UserRouteAccessService } from '../../../app/core/auth/user-route-access-service';

import { ISugerencias, Sugerencias } from '../../shared/model/sugerencias.model';
import { SugerenciasService } from './sugerencias.service';
import { SugerenciasComponent } from './sugerencias.component';

@Injectable({ providedIn: 'root' })
export class SugerenciasResolve implements Resolve<ISugerencias> {
  constructor(private service: SugerenciasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISugerencias> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sugerencias: HttpResponse<Sugerencias>) => {
          if (sugerencias.body) {
            return of(sugerencias.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Sugerencias());
  }
}

export const sugerenciasRoute: Routes = [
  {
    path: '',
    component: SugerenciasComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Sugerencia',
    },
    canActivate: [UserRouteAccessService],
  },
  /* {
    path: ':id/view',
    component: PuestosDetailComponent,
    resolve: {
      puestos: PuestosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.puestos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PuestosUpdateComponent,
    resolve: {
      puestos: PuestosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.puestos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PuestosUpdateComponent,
    resolve: {
      puestos: PuestosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.puestos.home.title',
    },
    canActivate: [UserRouteAccessService],
  }, */
];
