import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPuestos, Puestos } from 'app/shared/model/puestos.model';
import { PuestosService } from './puestos.service';
import { PuestosComponent } from './puestos.component';
import { PuestosDetailComponent } from './puestos-detail.component';
import { PuestosUpdateComponent } from './puestos-update.component';

@Injectable({ providedIn: 'root' })
export class PuestosResolve implements Resolve<IPuestos> {
  constructor(private service: PuestosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPuestos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((puestos: HttpResponse<Puestos>) => {
          if (puestos.body) {
            return of(puestos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Puestos());
  }
}

export const puestosRoute: Routes = [
  {
    path: '',
    component: PuestosComponent,
    data: {
      authorities: [Authority.EMPRESA],
      pageTitle: 'gestionEmpleadosApp.puestos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PuestosDetailComponent,
    resolve: {
      puestos: PuestosResolve,
    },
    data: {
      authorities: [Authority.EMPRESA],
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
      authorities: [Authority.EMPRESA],
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
      authorities: [Authority.EMPRESA],
      pageTitle: 'gestionEmpleadosApp.puestos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
