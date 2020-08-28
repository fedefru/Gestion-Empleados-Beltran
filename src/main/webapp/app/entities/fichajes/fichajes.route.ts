import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFichajes, Fichajes } from 'app/shared/model/fichajes.model';
import { FichajesService } from './fichajes.service';
import { FichajesComponent } from './fichajes.component';
import { FichajesDetailComponent } from './fichajes-detail.component';
import { FichajesUpdateComponent } from './fichajes-update.component';
import { InterfazFichajeComponent } from './interfaz-fichaje/interfaz-fichaje.component';

@Injectable({ providedIn: 'root' })
export class FichajesResolve implements Resolve<IFichajes> {
  constructor(private service: FichajesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFichajes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fichajes: HttpResponse<Fichajes>) => {
          if (fichajes.body) {
            return of(fichajes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Fichajes());
  }
}

export const fichajesRoute: Routes = [
  {
    path: '',
    component: FichajesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.fichajes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FichajesDetailComponent,
    resolve: {
      fichajes: FichajesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.fichajes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FichajesUpdateComponent,
    resolve: {
      fichajes: FichajesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.fichajes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FichajesUpdateComponent,
    resolve: {
      fichajes: FichajesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.fichajes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'fichaje',
    component: InterfazFichajeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.fichajes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
