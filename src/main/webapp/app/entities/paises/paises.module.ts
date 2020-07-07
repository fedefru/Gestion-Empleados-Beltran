import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { PaisesComponent } from './paises.component';
import { PaisesDetailComponent } from './paises-detail.component';
import { PaisesUpdateComponent } from './paises-update.component';
import { PaisesDeleteDialogComponent } from './paises-delete-dialog.component';
import { paisesRoute } from './paises.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(paisesRoute)],
  declarations: [PaisesComponent, PaisesDetailComponent, PaisesUpdateComponent, PaisesDeleteDialogComponent],
  entryComponents: [PaisesDeleteDialogComponent],
})
export class GestionEmpleadosPaisesModule {}
