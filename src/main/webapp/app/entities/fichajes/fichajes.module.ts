import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { FichajesComponent } from './fichajes.component';
import { FichajesDetailComponent } from './fichajes-detail.component';
import { FichajesUpdateComponent } from './fichajes-update.component';
import { FichajesDeleteDialogComponent } from './fichajes-delete-dialog.component';
import { fichajesRoute } from './fichajes.route';
import { InterfazFichajeComponent } from './interfaz-fichaje/interfaz-fichaje.component';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(fichajesRoute)],
  declarations: [
    FichajesComponent,
    FichajesDetailComponent,
    FichajesUpdateComponent,
    FichajesDeleteDialogComponent,
    InterfazFichajeComponent,
  ],
  entryComponents: [FichajesDeleteDialogComponent],
})
export class GestionEmpleadosFichajesModule {}
