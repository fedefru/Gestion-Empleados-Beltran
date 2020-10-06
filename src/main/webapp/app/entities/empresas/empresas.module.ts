import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { EmpresasComponent } from './empresas.component';
import { EmpresasDetailComponent } from './empresas-detail.component';
/* import { EmpresasUpdateComponent } from './empresas-update.component'; */
import { EmpresasDeleteDialogComponent } from './empresas-delete-dialog.component';
import { empresasRoute } from './empresas.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(empresasRoute)],
  declarations: [EmpresasComponent, EmpresasDetailComponent, EmpresasDeleteDialogComponent],
  entryComponents: [EmpresasDeleteDialogComponent],
})
export class GestionEmpleadosEmpresasModule {}
