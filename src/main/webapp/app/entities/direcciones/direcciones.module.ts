import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { DireccionesComponent } from './direcciones.component';
import { DireccionesDetailComponent } from './direcciones-detail.component';
import { DireccionesUpdateComponent } from './direcciones-update.component';
import { DireccionesDeleteDialogComponent } from './direcciones-delete-dialog.component';
import { direccionesRoute } from './direcciones.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(direccionesRoute)],
  declarations: [DireccionesComponent, DireccionesDetailComponent, DireccionesUpdateComponent, DireccionesDeleteDialogComponent],
  entryComponents: [DireccionesDeleteDialogComponent],
})
export class GestionEmpleadosDireccionesModule {}
