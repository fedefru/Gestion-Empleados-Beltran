import { Routes } from '@angular/router';
import { Authority } from '../../../app/shared/constants/authority.constants';
import { UserRouteAccessService } from '../../../app/core/auth/user-route-access-service';
import { OrganigramaComponent } from './organigrama.component';

export const organigramaRoute: Routes = [
  {
    path: '',
    component: OrganigramaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Organigrama',
    },
    canActivate: [UserRouteAccessService],
  },
];
