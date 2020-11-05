import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEmpleados, Empleados } from 'app/shared/model/empleados.model';
import { EmpleadosService } from './empleados.service';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosDetailComponent } from './empleados-detail.component';
import { EmpleadosUpdateComponent } from './empleados-update.component';

@Injectable({ providedIn: 'root' })
export class EmpleadosResolve implements Resolve<IEmpleados> {
  constructor(private service: EmpleadosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmpleados> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((empleados: HttpResponse<Empleados>) => {
          if (empleados.body) {
            return of(empleados.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Empleados());
  }
}

export const empleadosRoute: Routes = [
  {
    path: '',
    component: EmpleadosComponent,
    data: {
      authorities: [Authority.ADMIN],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEmpleadosApp.empleados.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmpleadosDetailComponent,
    resolve: {
      empleados: EmpleadosResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gestionEmpleadosApp.empleados.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmpleadosUpdateComponent,
    resolve: {
      empleados: EmpleadosResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gestionEmpleadosApp.empleados.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmpleadosUpdateComponent,
    resolve: {
      empleados: EmpleadosResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gestionEmpleadosApp.empleados.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
