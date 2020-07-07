import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { TipoContactosComponent } from './tipo-contactos.component';
import { TipoContactosDetailComponent } from './tipo-contactos-detail.component';
import { TipoContactosUpdateComponent } from './tipo-contactos-update.component';
import { TipoContactosDeleteDialogComponent } from './tipo-contactos-delete-dialog.component';
import { tipoContactosRoute } from './tipo-contactos.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(tipoContactosRoute)],
  declarations: [TipoContactosComponent, TipoContactosDetailComponent, TipoContactosUpdateComponent, TipoContactosDeleteDialogComponent],
  entryComponents: [TipoContactosDeleteDialogComponent],
})
export class GestionEmpleadosTipoContactosModule {}
