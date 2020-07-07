import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEmpleadosSharedModule } from 'app/shared/shared.module';
import { TipoDocumentosComponent } from './tipo-documentos.component';
import { TipoDocumentosDetailComponent } from './tipo-documentos-detail.component';
import { TipoDocumentosUpdateComponent } from './tipo-documentos-update.component';
import { TipoDocumentosDeleteDialogComponent } from './tipo-documentos-delete-dialog.component';
import { tipoDocumentosRoute } from './tipo-documentos.route';

@NgModule({
  imports: [GestionEmpleadosSharedModule, RouterModule.forChild(tipoDocumentosRoute)],
  declarations: [
    TipoDocumentosComponent,
    TipoDocumentosDetailComponent,
    TipoDocumentosUpdateComponent,
    TipoDocumentosDeleteDialogComponent,
  ],
  entryComponents: [TipoDocumentosDeleteDialogComponent],
})
export class GestionEmpleadosTipoDocumentosModule {}
