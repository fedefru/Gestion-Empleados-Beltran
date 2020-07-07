import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEntidades, Entidades } from 'app/shared/model/entidades.model';
import { EntidadesService } from './entidades.service';
import { EntidadesComponent } from './entidades.component';
import { EntidadesDetailComponent } from './entidades-detail.component';
import { EntidadesUpdateComponent } from './entidades-update.component';

@Injectable({ providedIn: 'root' })
export class EntidadesResolve implements Resolve<IEntidades> {
  constructor(private service: EntidadesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntidades> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((entidades: HttpResponse<Entidades>) => {
          if (entidades.body) {
            return of(entidades.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Entidades());
  }
}

export const entidadesRoute: Routes = [
  {
    path: '',
    component: EntidadesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.entidades.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntidadesDetailComponent,
    resolve: {
      entidades: EntidadesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.entidades.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntidadesUpdateComponent,
    resolve: {
      entidades: EntidadesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.entidades.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntidadesUpdateComponent,
    resolve: {
      entidades: EntidadesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.entidades.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
