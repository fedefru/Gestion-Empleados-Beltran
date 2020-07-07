import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { PuestosComponent } from './puestos.component';
import { PuestosDetailComponent } from './puestos-detail.component';
import { PuestosUpdateComponent } from './puestos-update.component';
import { PuestosDeleteDialogComponent } from './puestos-delete-dialog.component';
import { puestosRoute } from './puestos.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(puestosRoute)],
  declarations: [PuestosComponent, PuestosDetailComponent, PuestosUpdateComponent, PuestosDeleteDialogComponent],
  entryComponents: [PuestosDeleteDialogComponent],
})
export class GestionEmpleadosPuestosModule {}
