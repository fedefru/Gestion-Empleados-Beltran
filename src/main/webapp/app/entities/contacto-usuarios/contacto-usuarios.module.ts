import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { ContactoUsuariosComponent } from './contacto-usuarios.component';
import { ContactoUsuariosDetailComponent } from './contacto-usuarios-detail.component';
import { ContactoUsuariosUpdateComponent } from './contacto-usuarios-update.component';
import { ContactoUsuariosDeleteDialogComponent } from './contacto-usuarios-delete-dialog.component';
import { contactoUsuariosRoute } from './contacto-usuarios.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(contactoUsuariosRoute)],
  declarations: [
    ContactoUsuariosComponent,
    ContactoUsuariosDetailComponent,
    ContactoUsuariosUpdateComponent,
    ContactoUsuariosDeleteDialogComponent,
  ],
  entryComponents: [ContactoUsuariosDeleteDialogComponent],
})
export class GestionEmpleadosContactoUsuariosModule {}
