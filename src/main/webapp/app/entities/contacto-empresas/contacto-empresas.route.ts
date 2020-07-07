import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContactoEmpresas, ContactoEmpresas } from 'app/shared/model/contacto-empresas.model';
import { ContactoEmpresasService } from './contacto-empresas.service';
import { ContactoEmpresasComponent } from './contacto-empresas.component';
import { ContactoEmpresasDetailComponent } from './contacto-empresas-detail.component';
import { ContactoEmpresasUpdateComponent } from './contacto-empresas-update.component';

@Injectable({ providedIn: 'root' })
export class ContactoEmpresasResolve implements Resolve<IContactoEmpresas> {
  constructor(private service: ContactoEmpresasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContactoEmpresas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contactoEmpresas: HttpResponse<ContactoEmpresas>) => {
          if (contactoEmpresas.body) {
            return of(contactoEmpresas.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ContactoEmpresas());
  }
}

export const contactoEmpresasRoute: Routes = [
  {
    path: '',
    component: ContactoEmpresasComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.contactoEmpresas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContactoEmpresasDetailComponent,
    resolve: {
      contactoEmpresas: ContactoEmpresasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.contactoEmpresas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContactoEmpresasUpdateComponent,
    resolve: {
      contactoEmpresas: ContactoEmpresasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.contactoEmpresas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContactoEmpresasUpdateComponent,
    resolve: {
      contactoEmpresas: ContactoEmpresasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.contactoEmpresas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
