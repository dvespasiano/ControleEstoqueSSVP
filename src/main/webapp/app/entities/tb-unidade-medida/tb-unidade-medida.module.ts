import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContextoSharedModule } from 'app/shared/shared.module';
import { TbUnidadeMedidaComponent } from './tb-unidade-medida.component';
import { TbUnidadeMedidaDetailComponent } from './tb-unidade-medida-detail.component';
import { TbUnidadeMedidaUpdateComponent } from './tb-unidade-medida-update.component';
import { TbUnidadeMedidaDeletePopupComponent, TbUnidadeMedidaDeleteDialogComponent } from './tb-unidade-medida-delete-dialog.component';
import { tbUnidadeMedidaRoute, tbUnidadeMedidaPopupRoute } from './tb-unidade-medida.route';

const ENTITY_STATES = [...tbUnidadeMedidaRoute, ...tbUnidadeMedidaPopupRoute];

@NgModule({
  imports: [ContextoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TbUnidadeMedidaComponent,
    TbUnidadeMedidaDetailComponent,
    TbUnidadeMedidaUpdateComponent,
    TbUnidadeMedidaDeleteDialogComponent,
    TbUnidadeMedidaDeletePopupComponent
  ],
  entryComponents: [TbUnidadeMedidaDeleteDialogComponent]
})
export class ContextoTbUnidadeMedidaModule {}
