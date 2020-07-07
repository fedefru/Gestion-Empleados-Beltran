import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosDetailComponent } from './empleados-detail.component';
import { EmpleadosUpdateComponent } from './empleados-update.component';
import { EmpleadosDeleteDialogComponent } from './empleados-delete-dialog.component';
import { empleadosRoute } from './empleados.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(empleadosRoute)],
  declarations: [EmpleadosComponent, EmpleadosDetailComponent, EmpleadosUpdateComponent, EmpleadosDeleteDialogComponent],
  entryComponents: [EmpleadosDeleteDialogComponent],
})
export class GestionEmpleadosEmpleadosModule {}
