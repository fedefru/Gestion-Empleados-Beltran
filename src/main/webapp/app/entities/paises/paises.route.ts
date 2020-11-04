import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPaises, Paises } from 'app/shared/model/paises.model';
import { PaisesService } from './paises.service';
import { PaisesComponent } from './paises.component';
import { PaisesDetailComponent } from './paises-detail.component';
import { PaisesUpdateComponent } from './paises-update.component';

@Injectable({ providedIn: 'root' })
export class PaisesResolve implements Resolve<IPaises> {
  constructor(private service: PaisesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaises> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((paises: HttpResponse<Paises>) => {
          if (paises.body) {
            return of(paises.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Paises());
  }
}

export const paisesRoute: Routes = [
  {
    path: '',
    component: PaisesComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEmpleadosApp.paises.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaisesDetailComponent,
    resolve: {
      paises: PaisesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.paises.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaisesUpdateComponent,
    resolve: {
      paises: PaisesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.paises.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaisesUpdateComponent,
    resolve: {
      paises: PaisesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.paises.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
