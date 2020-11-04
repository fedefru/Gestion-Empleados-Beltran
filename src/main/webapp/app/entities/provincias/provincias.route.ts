import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProvincias, Provincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from './provincias.service';
import { ProvinciasComponent } from './provincias.component';
import { ProvinciasDetailComponent } from './provincias-detail.component';
import { ProvinciasUpdateComponent } from './provincias-update.component';

@Injectable({ providedIn: 'root' })
export class ProvinciasResolve implements Resolve<IProvincias> {
  constructor(private service: ProvinciasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProvincias> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((provincias: HttpResponse<Provincias>) => {
          if (provincias.body) {
            return of(provincias.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Provincias());
  }
}

export const provinciasRoute: Routes = [
  {
    path: '',
    component: ProvinciasComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEmpleadosApp.provincias.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProvinciasDetailComponent,
    resolve: {
      provincias: ProvinciasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.provincias.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProvinciasUpdateComponent,
    resolve: {
      provincias: ProvinciasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.provincias.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProvinciasUpdateComponent,
    resolve: {
      provincias: ProvinciasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.provincias.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
