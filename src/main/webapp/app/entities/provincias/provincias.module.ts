import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { ProvinciasComponent } from './provincias.component';
import { ProvinciasDetailComponent } from './provincias-detail.component';
import { ProvinciasUpdateComponent } from './provincias-update.component';
import { ProvinciasDeleteDialogComponent } from './provincias-delete-dialog.component';
import { provinciasRoute } from './provincias.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(provinciasRoute)],
  declarations: [ProvinciasComponent, ProvinciasDetailComponent, ProvinciasUpdateComponent, ProvinciasDeleteDialogComponent],
  entryComponents: [ProvinciasDeleteDialogComponent],
})
export class GestionEmpleadosProvinciasModule {}
