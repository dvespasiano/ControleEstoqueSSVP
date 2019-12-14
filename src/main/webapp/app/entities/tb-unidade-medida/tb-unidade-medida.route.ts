import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TbUnidadeMedida } from 'app/shared/model/tb-unidade-medida.model';
import { TbUnidadeMedidaService } from './tb-unidade-medida.service';
import { TbUnidadeMedidaComponent } from './tb-unidade-medida.component';
import { TbUnidadeMedidaDetailComponent } from './tb-unidade-medida-detail.component';
import { TbUnidadeMedidaUpdateComponent } from './tb-unidade-medida-update.component';
import { TbUnidadeMedidaDeletePopupComponent } from './tb-unidade-medida-delete-dialog.component';
import { ITbUnidadeMedida } from 'app/shared/model/tb-unidade-medida.model';

@Injectable({ providedIn: 'root' })
export class TbUnidadeMedidaResolve implements Resolve<ITbUnidadeMedida> {
  constructor(private service: TbUnidadeMedidaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITbUnidadeMedida> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TbUnidadeMedida>) => response.ok),
        map((tbUnidadeMedida: HttpResponse<TbUnidadeMedida>) => tbUnidadeMedida.body)
      );
    }
    return of(new TbUnidadeMedida());
  }
}

export const tbUnidadeMedidaRoute: Routes = [
  {
    path: '',
    component: TbUnidadeMedidaComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'TbUnidadeMedidas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TbUnidadeMedidaDetailComponent,
    resolve: {
      tbUnidadeMedida: TbUnidadeMedidaResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'TbUnidadeMedidas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TbUnidadeMedidaUpdateComponent,
    resolve: {
      tbUnidadeMedida: TbUnidadeMedidaResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'TbUnidadeMedidas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TbUnidadeMedidaUpdateComponent,
    resolve: {
      tbUnidadeMedida: TbUnidadeMedidaResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'TbUnidadeMedidas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tbUnidadeMedidaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TbUnidadeMedidaDeletePopupComponent,
    resolve: {
      tbUnidadeMedida: TbUnidadeMedidaResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'TbUnidadeMedidas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
