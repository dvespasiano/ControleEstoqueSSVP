import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiParseLinks } from 'ng-jhipster';

import { ITbMovimentacao } from 'app/shared/model/tb-movimentacao.model';
import { AccountService } from 'app/core/auth/account.service';
import { TbMovimentacaoService } from './tb-movimentacao.service';

import { ActivatedRoute, Router } from '@angular/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ITbProduto, TbProduto } from 'app/shared/model/tb-produto.model';
import * as jsPDF from 'jspdf';
require('jspdf-autotable');

@Component({
  selector: 'jhi-tb-movimentacao',
  templateUrl: './tb-movimentacao.component.html'
})
export class TbMovimentacaoComponent implements OnInit, OnDestroy {
  tbMovimentacaos: ITbMovimentacao[];
  relatorio: { nome: string; entradas: number; saidas: number }[];
  currentAccount: any;
  eventSubscriber: Subscription;
  error: any;
  success: any;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    protected tbMovimentacaoService: TbMovimentacaoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  public aux() {
    const tabela: string[][] = [[]];
    let movimentacaoAtual: string[] = [];
    for (let index = 0; index < this.relatorio.length; index++) {
      movimentacaoAtual = [
        this.relatorio[index].nome,
        this.relatorio[index].entradas + '',
        this.relatorio[index].saidas + '',
        this.relatorio[index].entradas - this.relatorio[index].saidas + ''
      ];
      tabela.push(movimentacaoAtual);
    }
    return tabela;
  }

  public downloadPDF() {
    const doc = new jsPDF();
    const tabelaMovimentacoes = this.aux();
    //doc.autoTable({ html: '#lista-produtos', theme: 'grid'});
    doc.autoTable({
      head: [['Nome do Produto', 'Entradas', 'Saídas', 'Saldo']],
      body: tabelaMovimentacoes,
      theme: 'grid'
    });
    doc.save('table.pdf');
    //doc.auto
  }

  loadAll() {
    this.tbMovimentacaoService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .pipe(
        filter((res: HttpResponse<ITbMovimentacao[]>) => res.ok),
        map((res: HttpResponse<ITbMovimentacao[]>) => res.body)
      )
      .subscribe(
        (res: ITbMovimentacao[]) => {
          this.tbMovimentacaos = res;
          this.relatorio = [];
          let prod: ITbProduto;
          let existe: boolean;
          let relAtual: { nome: string; entradas: number; saidas: number };
          let i: number;
          this.tbMovimentacaos.forEach(mov => {
            existe = false;
            i = 0;
            this.relatorio.forEach(rel => {
              if (rel.nome === mov.produto.nmProduto) {
                existe = true;
                this.relatorio[i].entradas += mov.entrada === 1 ? mov.quantidade : 0;
                this.relatorio[i].saidas += mov.entrada === 0 ? mov.quantidade : 0;
              }
              i = i + 1;
            });
            if (!existe) {
              relAtual = {
                nome: mov.produto.nmProduto,
                entradas: mov.entrada === 1 ? mov.quantidade : 0,
                saidas: mov.entrada === 0 ? mov.quantidade : 0
              };
              this.relatorio.push(relAtual);
            }
          });
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/tb-movimentacao'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/tb-movimentacao',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
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

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTbProdutos(data: ITbMovimentacao[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.tbMovimentacaos = data;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
