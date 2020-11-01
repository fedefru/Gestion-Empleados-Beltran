/* eslint-disable no-console */

import { NgModule } from '@angular/core';

import { GestionEmpleadosSharedModule } from '../../../app/shared/shared.module';
import { RegistroComponent } from './registro.component';
// imports library material
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { registroRoute } from './registro.route';

@NgModule({
  imports: [
    GestionEmpleadosSharedModule,
    MatStepperModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatExpansionModule,
    MatTabsModule,
    RouterModule.forChild(registroRoute),
  ],
  declarations: [RegistroComponent],
})
export class GestionEmpleadosRegistroModule {}

/* eslint-enable no-console */
