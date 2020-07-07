import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContactoUsuarios, ContactoUsuarios } from 'app/shared/model/contacto-usuarios.model';
import { ContactoUsuariosService } from './contacto-usuarios.service';
import { ContactoUsuariosComponent } from './contacto-usuarios.component';
import { ContactoUsuariosDetailComponent } from './contacto-usuarios-detail.component';
import { ContactoUsuariosUpdateComponent } from './contacto-usuarios-update.component';

@Injectable({ providedIn: 'root' })
export class ContactoUsuariosResolve implements Resolve<IContactoUsuarios> {
  constructor(private service: ContactoUsuariosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContactoUsuarios> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contactoUsuarios: HttpResponse<ContactoUsuarios>) => {
          if (contactoUsuarios.body) {
            return of(contactoUsuarios.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ContactoUsuarios());
  }
}

export const contactoUsuariosRoute: Routes = [
  {
    path: '',
    component: ContactoUsuariosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.contactoUsuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContactoUsuariosDetailComponent,
    resolve: {
      contactoUsuarios: ContactoUsuariosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.contactoUsuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContactoUsuariosUpdateComponent,
    resolve: {
      contactoUsuarios: ContactoUsuariosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.contactoUsuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContactoUsuariosUpdateComponent,
    resolve: {
      contactoUsuarios: ContactoUsuariosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.contactoUsuarios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
