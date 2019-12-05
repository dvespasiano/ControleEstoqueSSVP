import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tb-categoria',
        loadChildren: () => import('./tb-categoria/tb-categoria.module').then(m => m.ContextoTbCategoriaModule)
      },
      {
        path: 'tb-unidade-medida',
        loadChildren: () => import('./tb-unidade-medida/tb-unidade-medida.module').then(m => m.ContextoTbUnidadeMedidaModule)
      },
      {
        path: 'tb-produto',
        loadChildren: () => import('./tb-produto/tb-produto.module').then(m => m.ContextoTbProdutoModule)
      },
      {
        path: 'tb-movimentacao',
        loadChildren: () => import('./tb-movimentacao/tb-movimentacao.module').then(m => m.ContextoTbMovimentacaoModule)
      },
      {
        path: 'manual',
        loadChildren: () => import('./manual/manual.module').then(m => m.ContextoManualModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ContextoEntityModule {}
