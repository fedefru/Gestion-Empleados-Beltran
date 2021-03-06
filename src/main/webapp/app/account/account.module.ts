import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';

import { PasswordStrengthBarComponent } from './password/password-strength-bar.component';
import { RegisterComponent } from './register/register.component';
import { ActivateComponent } from './activate/activate.component';
import { PasswordComponent } from './password/password.component';
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component';
import { SettingsComponent } from './settings/settings.component';
import { accountState } from './account.route';
import { UsuariosUpdateComponent } from '../entities/usuarios/usuarios-update.component';
import { EmpresasUpdateComponent } from '../entities/empresas/empresas-update.component';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(accountState)],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    UsuariosUpdateComponent,
    EmpresasUpdateComponent,
  ],
})
export class AccountModule {}
