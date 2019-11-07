import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TbMovimentacao } from 'app/shared/model/tb-movimentacao.model';
import { TbMovimentacaoService } from './tb-movimentacao.service';
import { TbMovimentacaoComponent } from './tb-movimentacao.component';
import { TbMovimentacaoDetailComponent } from './tb-movimentacao-detail.component';
import { TbMovimentacaoUpdateComponent } from './tb-movimentacao-update.component';
import { TbMovimentacaoDeletePopupComponent } from './tb-movimentacao-delete-dialog.component';
import { ITbMovimentacao } from 'app/shared/model/tb-movimentacao.model';

@Injectable({ providedIn: 'root' })
export class TbMovimentacaoResolve implements Resolve<ITbMovimentacao> {
  constructor(private service: TbMovimentacaoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITbMovimentacao> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TbMovimentacao>) => response.ok),
        map((tbMovimentacao: HttpResponse<TbMovimentacao>) => tbMovimentacao.body)
      );
    }
    return of(new TbMovimentacao());
  }
}

export const tbMovimentacaoRoute: Routes = [
  {
    path: '',
    component: TbMovimentacaoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TbMovimentacaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TbMovimentacaoDetailComponent,
    resolve: {
      tbMovimentacao: TbMovimentacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TbMovimentacaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TbMovimentacaoUpdateComponent,
    resolve: {
      tbMovimentacao: TbMovimentacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TbMovimentacaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TbMovimentacaoUpdateComponent,
    resolve: {
      tbMovimentacao: TbMovimentacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TbMovimentacaos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tbMovimentacaoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TbMovimentacaoDeletePopupComponent,
    resolve: {
      tbMovimentacao: TbMovimentacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TbMovimentacaos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
