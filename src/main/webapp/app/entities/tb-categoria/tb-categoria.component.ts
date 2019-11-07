import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITbCategoria } from 'app/shared/model/tb-categoria.model';
import { AccountService } from 'app/core/auth/account.service';
import { TbCategoriaService } from './tb-categoria.service';

@Component({
  selector: 'jhi-tb-categoria',
  templateUrl: './tb-categoria.component.html'
})
export class TbCategoriaComponent implements OnInit, OnDestroy {
  tbCategorias: ITbCategoria[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tbCategoriaService: TbCategoriaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tbCategoriaService
      .query()
      .pipe(
        filter((res: HttpResponse<ITbCategoria[]>) => res.ok),
        map((res: HttpResponse<ITbCategoria[]>) => res.body)
      )
      .subscribe(
        (res: ITbCategoria[]) => {
          this.tbCategorias = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTbCategorias();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITbCategoria) {
    return item.id;
  }

  registerChangeInTbCategorias() {
    this.eventSubscriber = this.eventManager.subscribe('tbCategoriaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
