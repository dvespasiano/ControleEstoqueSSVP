import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TbCategoria } from 'app/shared/model/tb-categoria.model';
import { TbCategoriaService } from './tb-categoria.service';
import { TbCategoriaComponent } from './tb-categoria.component';
import { TbCategoriaDetailComponent } from './tb-categoria-detail.component';
import { TbCategoriaUpdateComponent } from './tb-categoria-update.component';
import { TbCategoriaDeletePopupComponent } from './tb-categoria-delete-dialog.component';
import { ITbCategoria } from 'app/shared/model/tb-categoria.model';

@Injectable({ providedIn: 'root' })
export class TbCategoriaResolve implements Resolve<ITbCategoria> {
  constructor(private service: TbCategoriaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITbCategoria> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TbCategoria>) => response.ok),
        map((tbCategoria: HttpResponse<TbCategoria>) => tbCategoria.body)
      );
    }
    return of(new TbCategoria());
  }
}

export const tbCategoriaRoute: Routes = [
  {
    path: '',
    component: TbCategoriaComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'TbCategorias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TbCategoriaDetailComponent,
    resolve: {
      tbCategoria: TbCategoriaResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'TbCategorias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TbCategoriaUpdateComponent,
    resolve: {
      tbCategoria: TbCategoriaResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'TbCategorias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TbCategoriaUpdateComponent,
    resolve: {
      tbCategoria: TbCategoriaResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'TbCategorias'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tbCategoriaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TbCategoriaDeletePopupComponent,
    resolve: {
      tbCategoria: TbCategoriaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TbCategorias'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
