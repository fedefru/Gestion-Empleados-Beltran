import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { GruposComponent } from './grupos.component';
import { GruposDetailComponent } from './grupos-detail.component';
import { GruposUpdateComponent } from './grupos-update.component';
import { GruposDeleteDialogComponent } from './grupos-delete-dialog.component';
import { gruposRoute } from './grupos.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(gruposRoute)],
  declarations: [GruposComponent, GruposDetailComponent, GruposUpdateComponent, GruposDeleteDialogComponent],
  entryComponents: [GruposDeleteDialogComponent],
})
export class GestionEmpleadosGruposModule {}
