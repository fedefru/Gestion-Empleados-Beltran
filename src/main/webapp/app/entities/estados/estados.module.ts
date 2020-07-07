import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { EstadosComponent } from './estados.component';
import { EstadosDetailComponent } from './estados-detail.component';
import { EstadosUpdateComponent } from './estados-update.component';
import { EstadosDeleteDialogComponent } from './estados-delete-dialog.component';
import { estadosRoute } from './estados.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(estadosRoute)],
  declarations: [EstadosComponent, EstadosDetailComponent, EstadosUpdateComponent, EstadosDeleteDialogComponent],
  entryComponents: [EstadosDeleteDialogComponent],
})
export class GestionEmpleadosEstadosModule {}
