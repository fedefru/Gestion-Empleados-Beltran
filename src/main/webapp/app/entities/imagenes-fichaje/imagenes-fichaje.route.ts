import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from '../../../app/core/auth/user-route-access-service';
import { IFichajes, Fichajes } from '../../../app/shared/model/fichajes.model';
import { ImagenesFichajeService } from './imagenes-fichaje.service';
import { ImagenesFichajeComponent } from './imagenes-fichaje.component';

@Injectable({ providedIn: 'root' })
export class FichajesResolve implements Resolve<IFichajes> {
  constructor(private service: ImagenesFichajeService, private router: Router) {}

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

export const ImagenesRoute: Routes = [
  {
    path: '',
    component: ImagenesFichajeComponent,
    data: {
      authorities: [],
      pageTitle: 'gestionEmpleadosApp.fichajes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'fichaje',
    component: ImagenesFichajeComponent,
    data: {
      authorities: [],
      pageTitle: 'gestionEmpleadosApp.fichajes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
