import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IConfiguraciones, Configuraciones } from 'app/shared/model/configuraciones.model';
import { ConfiguracionesService } from './configuraciones.service';
import { ConfiguracionesComponent } from './configuraciones.component';
import { ConfiguracionesDetailComponent } from './configuraciones-detail.component';
import { ConfiguracionesUpdateComponent } from './configuraciones-update.component';

@Injectable({ providedIn: 'root' })
export class ConfiguracionesResolve implements Resolve<IConfiguraciones> {
  constructor(private service: ConfiguracionesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConfiguraciones> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((configuraciones: HttpResponse<Configuraciones>) => {
          if (configuraciones.body) {
            return of(configuraciones.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Configuraciones());
  }
}

export const configuracionesRoute: Routes = [
  {
    path: '',
    component: ConfiguracionesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.configuraciones.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConfiguracionesDetailComponent,
    resolve: {
      configuraciones: ConfiguracionesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.configuraciones.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConfiguracionesUpdateComponent,
    resolve: {
      configuraciones: ConfiguracionesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.configuraciones.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConfiguracionesUpdateComponent,
    resolve: {
      configuraciones: ConfiguracionesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.configuraciones.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
