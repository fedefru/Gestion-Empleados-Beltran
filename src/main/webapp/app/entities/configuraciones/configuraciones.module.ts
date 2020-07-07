import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { ConfiguracionesComponent } from './configuraciones.component';
import { ConfiguracionesDetailComponent } from './configuraciones-detail.component';
import { ConfiguracionesUpdateComponent } from './configuraciones-update.component';
import { ConfiguracionesDeleteDialogComponent } from './configuraciones-delete-dialog.component';
import { configuracionesRoute } from './configuraciones.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(configuracionesRoute)],
  declarations: [
    ConfiguracionesComponent,
    ConfiguracionesDetailComponent,
    ConfiguracionesUpdateComponent,
    ConfiguracionesDeleteDialogComponent,
  ],
  entryComponents: [ConfiguracionesDeleteDialogComponent],
})
export class GestionEmpleadosConfiguracionesModule {}
