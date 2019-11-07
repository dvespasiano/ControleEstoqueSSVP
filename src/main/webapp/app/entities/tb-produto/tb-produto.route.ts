import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TbProduto } from 'app/shared/model/tb-produto.model';
import { TbProdutoService } from './tb-produto.service';
import { TbProdutoComponent } from './tb-produto.component';
import { TbProdutoDetailComponent } from './tb-produto-detail.component';
import { TbProdutoUpdateComponent } from './tb-produto-update.component';
import { TbProdutoDeletePopupComponent } from './tb-produto-delete-dialog.component';
import { ITbProduto } from 'app/shared/model/tb-produto.model';

@Injectable({ providedIn: 'root' })
export class TbProdutoResolve implements Resolve<ITbProduto> {
  constructor(private service: TbProdutoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITbProduto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TbProduto>) => response.ok),
        map((tbProduto: HttpResponse<TbProduto>) => tbProduto.body)
      );
    }
    return of(new TbProduto());
  }
}

export const tbProdutoRoute: Routes = [
  {
    path: '',
    component: TbProdutoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'TbProdutos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TbProdutoDetailComponent,
    resolve: {
      tbProduto: TbProdutoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TbProdutos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TbProdutoUpdateComponent,
    resolve: {
      tbProduto: TbProdutoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TbProdutos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TbProdutoUpdateComponent,
    resolve: {
      tbProduto: TbProdutoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TbProdutos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tbProdutoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TbProdutoDeletePopupComponent,
    resolve: {
      tbProduto: TbProdutoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TbProdutos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
