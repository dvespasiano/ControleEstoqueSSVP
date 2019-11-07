import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITbMovimentacao } from 'app/shared/model/tb-movimentacao.model';
import { AccountService } from 'app/core/auth/account.service';
import { TbMovimentacaoService } from './tb-movimentacao.service';

@Component({
  selector: 'jhi-tb-movimentacao',
  templateUrl: './tb-movimentacao.component.html'
})
export class TbMovimentacaoComponent implements OnInit, OnDestroy {
  tbMovimentacaos: ITbMovimentacao[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tbMovimentacaoService: TbMovimentacaoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tbMovimentacaoService
      .query()
      .pipe(
        filter((res: HttpResponse<ITbMovimentacao[]>) => res.ok),
        map((res: HttpResponse<ITbMovimentacao[]>) => res.body)
      )
      .subscribe(
        (res: ITbMovimentacao[]) => {
          this.tbMovimentacaos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTbMovimentacaos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITbMovimentacao) {
    return item.id;
  }

  registerChangeInTbMovimentacaos() {
    this.eventSubscriber = this.eventManager.subscribe('tbMovimentacaoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
