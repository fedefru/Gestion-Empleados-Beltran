import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { GrupoUsuariosComponent } from './grupo-usuarios.component';
import { GrupoUsuariosDetailComponent } from './grupo-usuarios-detail.component';
import { GrupoUsuariosUpdateComponent } from './grupo-usuarios-update.component';
import { GrupoUsuariosDeleteDialogComponent } from './grupo-usuarios-delete-dialog.component';
import { grupoUsuariosRoute } from './grupo-usuarios.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(grupoUsuariosRoute)],
  declarations: [GrupoUsuariosComponent, GrupoUsuariosDetailComponent, GrupoUsuariosUpdateComponent, GrupoUsuariosDeleteDialogComponent],
  entryComponents: [GrupoUsuariosDeleteDialogComponent],
})
export class GestionEmpleadosGrupoUsuariosModule {}
