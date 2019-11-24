import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITbProduto, TbProduto } from 'app/shared/model/tb-produto.model';
import { AccountService } from 'app/core/auth/account.service';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TbProdutoService } from './tb-produto.service';
import * as jsPDF from 'jspdf';
require('jspdf-autotable');

@Component({
  selector: 'jhi-tb-produto',
  templateUrl: './tb-produto.component.html',
  styleUrls: ['./tb-produto.component.scss']
})
export class TbProdutoComponent implements OnInit, OnDestroy {
  categoria_radio = 'Todos';
  nome = '';
  currentAccount: any;
  tbProdutos: TbProduto[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  situacao: number;

  constructor(
    protected tbProdutoService: TbProdutoService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      //this.predicate = data.pagingParams.predicate;
      this.predicate = 'situacao';
    });
  }

  public aux() {
    const tabela: string[][] = [[]];
    let produtoAtual: string[] = [];
    let i = 1;
    this.tbProdutos.forEach(p => {
      produtoAtual = [p.nmProduto, p.qtdEstoque + '', p.qtdMin + '', p.categoria.nmCategoria + '', this.decideSituacao(p.situacao + '')];
      tabela.push(produtoAtual);
      i = i + 1;
    });
    return tabela;
  }

  public downloadPDF() {
    const doc = new jsPDF();
    const tabelaProdutos = this.aux();
    //doc.autoTable({ html: '#lista-produtos', theme: 'grid'});
    doc.autoTable({
      head: [['Nome do Produto', 'Quantidade no Estoque', 'Quantidade Mínima', 'Categoria', 'Situação']],
      body: tabelaProdutos,
      theme: 'grid'
    });
    doc.save('table.pdf');
    //doc.auto
  }

  decideSituacao(num1: string) {
    if (this.menor(num1, '1')) {
      return 'Em falta';
    } else if (this.maiorIgual(num1, '1') && this.menor(num1, '1.2')) {
      return 'Quase em falta';
    } else if (this.maiorIgual(num1, '1.2')) {
      return 'Em estoque';
    }
  }

  maior(num1: string, num2: string) {
    if (parseFloat(num1) > parseFloat(num2)) {
      return true;
    } else {
      return false;
    }
  }

  maiorIgual(num1: string, num2: string) {
    if (parseFloat(num1) >= parseFloat(num2)) {
      return true;
    } else {
      return false;
    }
  }

  menor(num1: string, num2: string) {
    if (parseFloat(num1) < parseFloat(num2)) {
      return true;
    } else {
      return false;
    }
  }

  menorIgual(num1: string, num2: string) {
    if (parseFloat(num1) <= parseFloat(num2)) {
      return true;
    } else {
      return false;
    }
  }

  loadAll() {
    this.tbProdutoService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ITbProduto[]>) => this.paginateTbProdutos(res.body, res.headers),
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
    this.router.navigate(['/tb-produto'], {
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
      '/tb-produto',
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
    this.registerChangeInTbProdutos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITbProduto) {
    return item.id;
  }

  registerChangeInTbProdutos() {
    this.eventSubscriber = this.eventManager.subscribe('tbProdutoListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTbProdutos(data: ITbProduto[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.tbProdutos = data;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
