import { ValidatorService } from '../validator.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { ITbProduto, TbProduto } from 'app/shared/model/tb-produto.model';
import { TbProdutoService } from './tb-produto.service';
import { ITbMovimentacao, TbMovimentacao } from 'app/shared/model/tb-movimentacao.model';

import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ITbCategoria, TbCategoria } from 'app/shared/model/tb-categoria.model';
import { AccountService } from 'app/core/auth/account.service';
import { TbCategoriaService } from '../tb-categoria/tb-categoria.service';
import { ITbUnidadeMedida, TbUnidadeMedida } from 'app/shared/model/tb-unidade-medida.model';
import { TbUnidadeMedidaService } from 'app/entities/tb-unidade-medida/tb-unidade-medida.service';
import * as moment from 'moment';
import { TbMovimentacaoService } from '../tb-movimentacao/tb-movimentacao.service';


@Component({
  selector: 'jhi-tb-produto-update',
  templateUrl: './tb-produto-update.component.html'
})
export class TbProdutoUpdateComponent implements OnInit, OnDestroy {
  isSaving: boolean;

  tbCategorias: ITbCategoria[];
  currentAccount: any;
  eventSubscriber: Subscription;
  tbUnidadeMedidas: ITbUnidadeMedida[];

  editForm = this.fb.group({
    nmProduto: ['', Validators.required],
    qtdMin: ['', [Validators.required, this.invalidaValNeg]],
    categoria: ['', [Validators.required, this.invalidacaoSelect]],
    unidadeMedida: ['', [Validators.required, this.invalidacaoSelect]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected tbUnidadeMedidaService: TbUnidadeMedidaService,
    protected tbCategoriaService: TbCategoriaService,
    protected tbProdutoService: TbProdutoService,
    protected tbMovimentacaoService: TbMovimentacaoService,
  ) { }

  ngOnInit() {
    this.isSaving = false;
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTbCategorias();
    this.activatedRoute.data.subscribe(({ tbProduto }) => {
      this.updateForm(tbProduto);
    });
  }

  invalidaValNeg(input: FormControl) {
    return ValidatorService.invalidaValNeg(input);
  }

  naoPreenchido(input: FormControl) {
    return ValidatorService.naoPreenchido(input);
  }

  invalidacaoSelect(input: FormControl) {
    return ValidatorService.invalidacaoSelect(input);
  }

  updateForm(tbProduto: ITbProduto) {
    this.editForm.patchValue({
      nmProduto: null,
      qtdMin: null,
      categoria: "padrao",
      unidadeMedida: "padrao",
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tbProduto: ITbProduto = this.createFromForm();
    const tbMovimentacao: ITbMovimentacao = new TbMovimentacao();
    tbMovimentacao.data = moment();
    tbMovimentacao.quantidade = tbProduto.qtdEstoque;
    tbMovimentacao.entrada = 1;
    tbMovimentacao.produto = tbProduto;
    tbMovimentacao.saldoAnt = 0;
    this.subscribeToSaveResponseProduto(this.tbProdutoService.create(tbProduto));
  }

  private createFromForm(): ITbProduto {
    const qtdEstoque = 0;
    const qtdMin: number = parseInt(this.editForm.get(['qtdMin']).value, 10);
    return {
      ...new TbProduto(),
      nmProduto: this.editForm.get(['nmProduto']).value,
      qtdEstoque: 0,
      qtdMin: this.editForm.get(['qtdMin']).value,
      situacao: qtdEstoque / qtdMin,
      ativo: 1,
      categoria: this.buscaCategoria(),
      unidadeMedida: this.buscaUnidadeMedida()
    };
  }

  private buscaCategoria() {
    let categoria: ITbCategoria;
    this.tbCategorias.forEach(element => {
      if (element.id === parseInt(this.editForm.get(['categoria']).value, 10)) {
        categoria = element;
      }
    });
    return categoria;
  }

  private buscaUnidadeMedida() {
    let unidadeMedida: ITbUnidadeMedida;
    this.tbUnidadeMedidas.forEach(element => {
      if (element.id === parseInt(this.editForm.get(['unidadeMedida']).value, 10)) {
        unidadeMedida = element;
      }
    });
    return unidadeMedida;
  }

  protected subscribeToSaveResponseProduto(result: Observable<HttpResponse<ITbProduto>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected subscribeToSaveResponseMovimentacao(result: Observable<HttpResponse<ITbMovimentacao>>) {
    result.subscribe();
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();    
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTbMovimentacaoById(index: number, item: ITbMovimentacao) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }

  loadAll() {
    this.tbCategoriaService
      .query()
      .pipe(
        filter((res: HttpResponse<ITbCategoria[]>) => res.ok),
        map((res: HttpResponse<ITbCategoria[]>) => res.body)
      )
      .subscribe(
        (res: ITbCategoria[]) =>
          this.tbCategorias = res, (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.tbUnidadeMedidaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITbUnidadeMedida[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITbUnidadeMedida[]>) => response.body)
      )
      .subscribe((res: ITbUnidadeMedida[]) =>
        (this.tbUnidadeMedidas = res), (res: HttpErrorResponse) => this.onError(res.message));

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
}
