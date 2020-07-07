import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { EntidadesEmpresasComponent } from './entidades-empresas.component';
import { EntidadesEmpresasDetailComponent } from './entidades-empresas-detail.component';
import { EntidadesEmpresasUpdateComponent } from './entidades-empresas-update.component';
import { EntidadesEmpresasDeleteDialogComponent } from './entidades-empresas-delete-dialog.component';
import { entidadesEmpresasRoute } from './entidades-empresas.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(entidadesEmpresasRoute)],
  declarations: [
    EntidadesEmpresasComponent,
    EntidadesEmpresasDetailComponent,
    EntidadesEmpresasUpdateComponent,
    EntidadesEmpresasDeleteDialogComponent,
  ],
  entryComponents: [EntidadesEmpresasDeleteDialogComponent],
})
export class GestionEmpleadosEntidadesEmpresasModule {}
