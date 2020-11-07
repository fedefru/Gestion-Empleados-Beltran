import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../../app/core/auth/user-route-access-service';
import { OrganigramaComponent } from './organigrama.component';

export const organigramaRoute: Routes = [
  {
    path: '',
    component: OrganigramaComponent,
    data: {
      authorities: [],
      pageTitle: 'Organigrama',
    },
    canActivate: [UserRouteAccessService],
  },
];
