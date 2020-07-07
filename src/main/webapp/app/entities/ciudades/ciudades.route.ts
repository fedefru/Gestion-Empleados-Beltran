import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICiudades, Ciudades } from 'app/shared/model/ciudades.model';
import { CiudadesService } from './ciudades.service';
import { CiudadesComponent } from './ciudades.component';
import { CiudadesDetailComponent } from './ciudades-detail.component';
import { CiudadesUpdateComponent } from './ciudades-update.component';

@Injectable({ providedIn: 'root' })
export class CiudadesResolve implements Resolve<ICiudades> {
  constructor(private service: CiudadesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICiudades> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ciudades: HttpResponse<Ciudades>) => {
          if (ciudades.body) {
            return of(ciudades.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ciudades());
  }
}

export const ciudadesRoute: Routes = [
  {
    path: '',
    component: CiudadesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.ciudades.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CiudadesDetailComponent,
    resolve: {
      ciudades: CiudadesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.ciudades.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CiudadesUpdateComponent,
    resolve: {
      ciudades: CiudadesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.ciudades.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CiudadesUpdateComponent,
    resolve: {
      ciudades: CiudadesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.ciudades.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
