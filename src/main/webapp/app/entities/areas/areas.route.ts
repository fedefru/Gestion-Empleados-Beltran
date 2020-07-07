import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAreas, Areas } from 'app/shared/model/areas.model';
import { AreasService } from './areas.service';
import { AreasComponent } from './areas.component';
import { AreasDetailComponent } from './areas-detail.component';
import { AreasUpdateComponent } from './areas-update.component';

@Injectable({ providedIn: 'root' })
export class AreasResolve implements Resolve<IAreas> {
  constructor(private service: AreasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAreas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((areas: HttpResponse<Areas>) => {
          if (areas.body) {
            return of(areas.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Areas());
  }
}

export const areasRoute: Routes = [
  {
    path: '',
    component: AreasComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.areas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AreasDetailComponent,
    resolve: {
      areas: AreasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.areas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AreasUpdateComponent,
    resolve: {
      areas: AreasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.areas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AreasUpdateComponent,
    resolve: {
      areas: AreasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.areas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
