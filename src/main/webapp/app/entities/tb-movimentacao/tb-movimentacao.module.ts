import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContextoSharedModule } from 'app/shared/shared.module';
import { TbMovimentacaoComponent } from './tb-movimentacao.component';
import { TbMovimentacaoDetailComponent } from './tb-movimentacao-detail.component';
import { TbMovimentacaoUpdateComponent } from './tb-movimentacao-update.component';
import { TbMovimentacaoDeletePopupComponent, TbMovimentacaoDeleteDialogComponent } from './tb-movimentacao-delete-dialog.component';
import { tbMovimentacaoRoute, tbMovimentacaoPopupRoute } from './tb-movimentacao.route';

const ENTITY_STATES = [...tbMovimentacaoRoute, ...tbMovimentacaoPopupRoute];

@NgModule({
  imports: [ContextoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TbMovimentacaoComponent,
    TbMovimentacaoDetailComponent,
    TbMovimentacaoUpdateComponent,
    TbMovimentacaoDeleteDialogComponent,
    TbMovimentacaoDeletePopupComponent
  ],
  entryComponents: [TbMovimentacaoDeleteDialogComponent]
})
export class ContextoTbMovimentacaoModule {}
