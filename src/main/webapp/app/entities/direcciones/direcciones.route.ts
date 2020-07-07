import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDirecciones, Direcciones } from 'app/shared/model/direcciones.model';
import { DireccionesService } from './direcciones.service';
import { DireccionesComponent } from './direcciones.component';
import { DireccionesDetailComponent } from './direcciones-detail.component';
import { DireccionesUpdateComponent } from './direcciones-update.component';

@Injectable({ providedIn: 'root' })
export class DireccionesResolve implements Resolve<IDirecciones> {
  constructor(private service: DireccionesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDirecciones> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((direcciones: HttpResponse<Direcciones>) => {
          if (direcciones.body) {
            return of(direcciones.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Direcciones());
  }
}

export const direccionesRoute: Routes = [
  {
    path: '',
    component: DireccionesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.direcciones.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DireccionesDetailComponent,
    resolve: {
      direcciones: DireccionesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.direcciones.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DireccionesUpdateComponent,
    resolve: {
      direcciones: DireccionesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.direcciones.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DireccionesUpdateComponent,
    resolve: {
      direcciones: DireccionesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.direcciones.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
