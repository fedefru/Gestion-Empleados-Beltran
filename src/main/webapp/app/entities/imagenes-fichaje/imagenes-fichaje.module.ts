import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from '../../../app/shared/shared.module';
import { ImagenesFichajeComponent } from './imagenes-fichaje.component';
import { ImagenesRoute } from './imagenes-fichaje.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(ImagenesRoute)],
  declarations: [ImagenesFichajeComponent],
})
export class GestionEmpleadosImagenesFichajeModule {}
