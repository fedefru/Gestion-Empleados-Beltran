import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { TipoDireccionComponent } from './tipo-direccion.component';
import { TipoDireccionDetailComponent } from './tipo-direccion-detail.component';
import { TipoDireccionUpdateComponent } from './tipo-direccion-update.component';
import { TipoDireccionDeleteDialogComponent } from './tipo-direccion-delete-dialog.component';
import { tipoDireccionRoute } from './tipo-direccion.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(tipoDireccionRoute)],
  declarations: [TipoDireccionComponent, TipoDireccionDetailComponent, TipoDireccionUpdateComponent, TipoDireccionDeleteDialogComponent],
  entryComponents: [TipoDireccionDeleteDialogComponent],
})
export class GestionEmpleadosTipoDireccionModule {}
