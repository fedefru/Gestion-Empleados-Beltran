import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { EntidadesUsuariosComponent } from './entidades-usuarios.component';
import { EntidadesUsuariosDetailComponent } from './entidades-usuarios-detail.component';
import { EntidadesUsuariosUpdateComponent } from './entidades-usuarios-update.component';
import { EntidadesUsuariosDeleteDialogComponent } from './entidades-usuarios-delete-dialog.component';
import { entidadesUsuariosRoute } from './entidades-usuarios.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(entidadesUsuariosRoute)],
  declarations: [
    EntidadesUsuariosComponent,
    EntidadesUsuariosDetailComponent,
    EntidadesUsuariosUpdateComponent,
    EntidadesUsuariosDeleteDialogComponent,
  ],
  entryComponents: [EntidadesUsuariosDeleteDialogComponent],
})
export class GestionEmpleadosEntidadesUsuariosModule {}
