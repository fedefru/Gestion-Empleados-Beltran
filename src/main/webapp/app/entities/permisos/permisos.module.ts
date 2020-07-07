import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { PermisosComponent } from './permisos.component';
import { PermisosDetailComponent } from './permisos-detail.component';
import { PermisosUpdateComponent } from './permisos-update.component';
import { PermisosDeleteDialogComponent } from './permisos-delete-dialog.component';
import { permisosRoute } from './permisos.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(permisosRoute)],
  declarations: [PermisosComponent, PermisosDetailComponent, PermisosUpdateComponent, PermisosDeleteDialogComponent],
  entryComponents: [PermisosDeleteDialogComponent],
})
export class GestionEmpleadosPermisosModule {}
