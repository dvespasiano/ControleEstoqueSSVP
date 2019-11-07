import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContextoSharedModule } from 'app/shared/shared.module';
import { TbCategoriaComponent } from './tb-categoria.component';
import { TbCategoriaDetailComponent } from './tb-categoria-detail.component';
import { TbCategoriaUpdateComponent } from './tb-categoria-update.component';
import { TbCategoriaDeletePopupComponent, TbCategoriaDeleteDialogComponent } from './tb-categoria-delete-dialog.component';
import { tbCategoriaRoute, tbCategoriaPopupRoute } from './tb-categoria.route';

const ENTITY_STATES = [...tbCategoriaRoute, ...tbCategoriaPopupRoute];

@NgModule({
  imports: [ContextoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TbCategoriaComponent,
    TbCategoriaDetailComponent,
    TbCategoriaUpdateComponent,
    TbCategoriaDeleteDialogComponent,
    TbCategoriaDeletePopupComponent
  ],
  entryComponents: [TbCategoriaDeleteDialogComponent]
})
export class ContextoTbCategoriaModule {}
