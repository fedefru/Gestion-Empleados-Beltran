import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { ContactoEmpresasComponent } from './contacto-empresas.component';
import { ContactoEmpresasDetailComponent } from './contacto-empresas-detail.component';
import { ContactoEmpresasUpdateComponent } from './contacto-empresas-update.component';
import { ContactoEmpresasDeleteDialogComponent } from './contacto-empresas-delete-dialog.component';
import { contactoEmpresasRoute } from './contacto-empresas.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(contactoEmpresasRoute)],
  declarations: [
    ContactoEmpresasComponent,
    ContactoEmpresasDetailComponent,
    ContactoEmpresasUpdateComponent,
    ContactoEmpresasDeleteDialogComponent,
  ],
  entryComponents: [ContactoEmpresasDeleteDialogComponent],
})
export class GestionEmpleadosContactoEmpresasModule {}
