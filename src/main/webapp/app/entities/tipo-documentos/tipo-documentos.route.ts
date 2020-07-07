import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoDocumentos, TipoDocumentos } from 'app/shared/model/tipo-documentos.model';
import { TipoDocumentosService } from './tipo-documentos.service';
import { TipoDocumentosComponent } from './tipo-documentos.component';
import { TipoDocumentosDetailComponent } from './tipo-documentos-detail.component';
import { TipoDocumentosUpdateComponent } from './tipo-documentos-update.component';

@Injectable({ providedIn: 'root' })
export class TipoDocumentosResolve implements Resolve<ITipoDocumentos> {
  constructor(private service: TipoDocumentosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoDocumentos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoDocumentos: HttpResponse<TipoDocumentos>) => {
          if (tipoDocumentos.body) {
            return of(tipoDocumentos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoDocumentos());
  }
}

export const tipoDocumentosRoute: Routes = [
  {
    path: '',
    component: TipoDocumentosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.tipoDocumentos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoDocumentosDetailComponent,
    resolve: {
      tipoDocumentos: TipoDocumentosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.tipoDocumentos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoDocumentosUpdateComponent,
    resolve: {
      tipoDocumentos: TipoDocumentosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.tipoDocumentos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoDocumentosUpdateComponent,
    resolve: {
      tipoDocumentos: TipoDocumentosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestionEmpleadosApp.tipoDocumentos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
