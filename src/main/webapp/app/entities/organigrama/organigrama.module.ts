import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from '../../../app/shared/shared.module';
import { OrganigramaComponent } from './organigrama.component';
import { organigramaRoute } from './organigrama.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(organigramaRoute)],
  declarations: [OrganigramaComponent],
})
export class GestionEmpleadosOrganigramaModule {}
