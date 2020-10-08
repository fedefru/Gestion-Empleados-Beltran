import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { SugerenciasRoutingModule } from './sugerencias-routing.module';
import { SugerenciasComponent } from './sugerencias.component';
import { RouterModule } from '@angular/router';
import { sugerenciasRoute } from '../sugerencias/sugerencias.route';
import { SugerenciasVistaComponent } from './sugerencias-vista/sugerencias-vista.component';

@NgModule({
  declarations: [SugerenciasComponent, SugerenciasVistaComponent],
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(sugerenciasRoute), CommonModule, SugerenciasRoutingModule],
})
export class GestionEmpleadosSugerenciasModule {}
