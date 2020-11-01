import { Routes } from '@angular/router';
import { RegistroComponent } from './registro.component';

export const registroRoute: Routes = [
  {
    path: '',
    component: RegistroComponent,
    data: {
      authorities: [],
      pageTitle: 'gestionEmpleadosApp.registro.home.title',
    },
  },
];
