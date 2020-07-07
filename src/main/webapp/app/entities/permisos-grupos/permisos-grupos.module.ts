import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { PermisosGruposComponent } from './permisos-grupos.component';
import { PermisosGruposDetailComponent } from './permisos-grupos-detail.component';
import { PermisosGruposUpdateComponent } from './permisos-grupos-update.component';
import { PermisosGruposDeleteDialogComponent } from './permisos-grupos-delete-dialog.component';
import { permisosGruposRoute } from './permisos-grupos.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(permisosGruposRoute)],
  declarations: [
    PermisosGruposComponent,
    PermisosGruposDetailComponent,
    PermisosGruposUpdateComponent,
    PermisosGruposDeleteDialogComponent,
  ],
  entryComponents: [PermisosGruposDeleteDialogComponent],
})
export class GestionEmpleadosPermisosGruposModule {}
