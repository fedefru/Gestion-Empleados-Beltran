import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { EntidadesComponent } from './entidades.component';
import { EntidadesDetailComponent } from './entidades-detail.component';
import { EntidadesUpdateComponent } from './entidades-update.component';
import { EntidadesDeleteDialogComponent } from './entidades-delete-dialog.component';
import { entidadesRoute } from './entidades.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(entidadesRoute)],
  declarations: [EntidadesComponent, EntidadesDetailComponent, EntidadesUpdateComponent, EntidadesDeleteDialogComponent],
  entryComponents: [EntidadesDeleteDialogComponent],
})
export class GestionEmpleadosEntidadesModule {}
