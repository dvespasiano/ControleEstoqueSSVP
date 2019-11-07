import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContextoSharedModule } from 'app/shared/shared.module';
import { TbProdutoComponent } from './tb-produto.component';
import { TbProdutoDetailComponent } from './tb-produto-detail.component';
import { TbProdutoUpdateComponent } from './tb-produto-update.component';
import { TbProdutoDeletePopupComponent, TbProdutoDeleteDialogComponent } from './tb-produto-delete-dialog.component';
import { tbProdutoRoute, tbProdutoPopupRoute } from './tb-produto.route';

const ENTITY_STATES = [...tbProdutoRoute, ...tbProdutoPopupRoute];

@NgModule({
  imports: [ContextoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TbProdutoComponent,
    TbProdutoDetailComponent,
    TbProdutoUpdateComponent,
    TbProdutoDeleteDialogComponent,
    TbProdutoDeletePopupComponent
  ],
  entryComponents: [TbProdutoDeleteDialogComponent]
})
export class ContextoTbProdutoModule {}
