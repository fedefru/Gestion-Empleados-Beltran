import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { GestionEmpleadosCoreModule } from 'app/core/core.module';
import { GestionEmpleadosAppRoutingModule } from './app-routing.module';
import { GestionEmpleadosHomeModule } from './home/home.module';
import { GestionEmpleadosEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { GestionEmpleadosOrganigramaModule } from './entities/organigrama/organigrama.module';

@NgModule({
  imports: [
    BrowserModule,
    GestionEmpleadosSharedModule,
    GestionEmpleadosCoreModule,
    GestionEmpleadosHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    GestionEmpleadosEntityModule,
    GestionEmpleadosAppRoutingModule,
    GestionEmpleadosOrganigramaModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class GestionEmpleadosAppModule {}
