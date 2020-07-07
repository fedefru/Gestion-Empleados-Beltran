import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGrupos, Grupos } from 'app/shared/model/grupos.model';
import { GruposService } from './grupos.service';
import { GruposComponent } from './grupos.component';
import { GruposDetailComponent } from './grupos-detail.component';
import { GruposUpdateComponent } from './grupos-update.component';

@Injectable({ providedIn: 'root' })
export class GruposResolve implements Resolve<IGrupos> {
  constructor(private service: GruposService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGrupos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((grupos: HttpResponse<Grupos>) => {
          if (grupos.body) {
            return of(grupos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Grupos());
  }
}

export const gruposRoute: Routes = [
  {
    path: '',
    component: GruposComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.grupos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GruposDetailComponent,
    resolve: {
      grupos: GruposResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.grupos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GruposUpdateComponent,
    resolve: {
      grupos: GruposResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.grupos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GruposUpdateComponent,
    resolve: {
      grupos: GruposResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.grupos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
