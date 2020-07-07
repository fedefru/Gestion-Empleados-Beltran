import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { AreasComponent } from './areas.component';
import { AreasDetailComponent } from './areas-detail.component';
import { AreasUpdateComponent } from './areas-update.component';
import { AreasDeleteDialogComponent } from './areas-delete-dialog.component';
import { areasRoute } from './areas.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(areasRoute)],
  declarations: [AreasComponent, AreasDetailComponent, AreasUpdateComponent, AreasDeleteDialogComponent],
  entryComponents: [AreasDeleteDialogComponent],
})
export class GestionEmpleadosAreasModule {}
