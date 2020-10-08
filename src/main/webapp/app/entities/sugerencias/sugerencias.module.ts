import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { SugerenciasRoutingModule } from './sugerencias-routing.module';
import { SugerenciasComponent } from './sugerencias.component';
import { RouterModule } from '@angular/router';
import { sugerenciasRoute } from '../sugerencias/sugerencias.route';

@NgModule({
  declarations: [SugerenciasComponent],
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(sugerenciasRoute), CommonModule, SugerenciasRoutingModule],
})
export class GestionEmpleadosSugerenciasModule {}
