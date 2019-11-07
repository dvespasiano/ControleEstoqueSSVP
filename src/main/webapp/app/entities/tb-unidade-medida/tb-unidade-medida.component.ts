import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITbUnidadeMedida } from 'app/shared/model/tb-unidade-medida.model';
import { AccountService } from 'app/core/auth/account.service';
import { TbUnidadeMedidaService } from './tb-unidade-medida.service';

@Component({
  selector: 'jhi-tb-unidade-medida',
  templateUrl: './tb-unidade-medida.component.html'
})
export class TbUnidadeMedidaComponent implements OnInit, OnDestroy {
  tbUnidadeMedidas: ITbUnidadeMedida[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tbUnidadeMedidaService: TbUnidadeMedidaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tbUnidadeMedidaService
      .query()
      .pipe(
        filter((res: HttpResponse<ITbUnidadeMedida[]>) => res.ok),
        map((res: HttpResponse<ITbUnidadeMedida[]>) => res.body)
      )
      .subscribe(
        (res: ITbUnidadeMedida[]) => {
          this.tbUnidadeMedidas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTbUnidadeMedidas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITbUnidadeMedida) {
    return item.id;
  }

  registerChangeInTbUnidadeMedidas() {
    this.eventSubscriber = this.eventManager.subscribe('tbUnidadeMedidaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
