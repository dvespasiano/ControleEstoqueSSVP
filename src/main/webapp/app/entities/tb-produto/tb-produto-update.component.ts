import { Component, OnInit, OnDestroy } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { ITbProduto, TbProduto } from 'app/shared/model/tb-produto.model';
import { TbProdutoService } from './tb-produto.service';
import { ITbMovimentacao } from 'app/shared/model/tb-movimentacao.model';
import { TbMovimentacaoService } from 'app/entities/tb-movimentacao/tb-movimentacao.service';

import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ITbCategoria, TbCategoria } from 'app/shared/model/tb-categoria.model';
import { AccountService } from 'app/core/auth/account.service';
import { TbCategoriaService } from '../tb-categoria/tb-categoria.service';
import { ITbUnidadeMedida, TbUnidadeMedida } from 'app/shared/model/tb-unidade-medida.model';
import { TbUnidadeMedidaService } from 'app/entities/tb-unidade-medida/tb-unidade-medida.service';

@Component({
  selector: 'jhi-tb-produto-update',
  templateUrl: './tb-produto-update.component.html'
})
export class TbProdutoUpdateComponent implements OnInit, OnDestroy {
  isSaving: boolean;

  tbmovimentacaos: ITbMovimentacao[];
  tbCategorias: ITbCategoria[];
  currentAccount: any;
  eventSubscriber: Subscription;
  tbUnidadeMedidas: ITbUnidadeMedida[];

  editForm = this.fb.group({
    id: [],
    idTbProduto: [],
    nmProduto: [],
    qtdEstoque: [],
    qtdMin: [],
    ativo: [],
    categoria: [],
    unidadeMedida: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tbProdutoService: TbProdutoService,
    protected tbMovimentacaoService: TbMovimentacaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected tbCategoriaService: TbCategoriaService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected tbUnidadeMedidaService: TbUnidadeMedidaService
  ) {}

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
    this.tbMovimentacaoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITbMovimentacao[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITbMovimentacao[]>) => response.body)
      )
      .subscribe((res: ITbMovimentacao[]) => (this.tbmovimentacaos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tbUnidadeMedidaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITbUnidadeMedida[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITbUnidadeMedida[]>) => response.body)
      )
      .subscribe((res: ITbUnidadeMedida[]) => (this.tbUnidadeMedidas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tbProduto: ITbProduto) {
    this.editForm.patchValue({
      id: tbProduto.id,
      nmProduto: tbProduto.nmProduto,
      qtdEstoque: tbProduto.qtdEstoque,
      qtdMin: tbProduto.qtdMin,
      ativo: tbProduto.ativo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tbProduto = this.createFromForm();
    if (tbProduto.id !== undefined) {
      this.subscribeToSaveResponse(this.tbProdutoService.update(tbProduto));
    } else {
      this.subscribeToSaveResponse(this.tbProdutoService.create(tbProduto));
    }
  }

  private createFromForm(): ITbProduto {
    const tbCategoria: ITbCategoria = new TbCategoria();
    tbCategoria.id = this.editForm.get(['categoria']).value;
    const tbUnidadeMedida: ITbUnidadeMedida = new TbUnidadeMedida();
    tbUnidadeMedida.id = this.editForm.get(['unidadeMedida']).value;
    return {
      ...new TbProduto(),
      id: this.editForm.get(['id']).value,
      nmProduto: this.editForm.get(['nmProduto']).value,
      qtdEstoque: this.editForm.get(['qtdEstoque']).value,
      qtdMin: this.editForm.get(['qtdMin']).value,
      ativo: 1,
      situacao: this.editForm.get(['qtdEstoque']).value / this.editForm.get(['qtdMin']).value,
      categoria: tbCategoria,
      unidadeMedida: tbUnidadeMedida
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITbProduto>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
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
        (res: ITbCategoria[]) => {
          this.tbCategorias = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
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
