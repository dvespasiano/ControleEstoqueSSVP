import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITbProduto, TbProduto } from 'app/shared/model/tb-produto.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { TbProdutoService } from './tb-produto.service';
import { ITbMovimentacao } from 'app/shared/model/tb-movimentacao.model';
import { TbMovimentacaoService } from 'app/entities/tb-movimentacao/tb-movimentacao.service';

@Component({
  selector: 'jhi-tb-produto-detail',
  templateUrl: './tb-produto-detail.component.html'
})
export class TbProdutoDetailComponent implements OnInit {
  tbProduto: ITbProduto;
  isSaving: boolean;
  tbmovimentacaos: ITbMovimentacao[];

  editForm = this.fb.group({
    id: [],
    idTbProduto: [],
    nmProduto: [],
    qtdAlterar: [],
    qtdMin: [],
    ativo: [],
    tipo: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tbProdutoService: TbProdutoService,
    protected tbMovimentacaoService: TbMovimentacaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tbProduto }) => {
      this.updateForm(tbProduto);
    });

    this.activatedRoute.data.subscribe(({ tbProduto }) => {
      this.tbProduto = tbProduto;
    });

    this.tbMovimentacaoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITbMovimentacao[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITbMovimentacao[]>) => response.body)
      )
      .subscribe((res: ITbMovimentacao[]) => (this.tbmovimentacaos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tbProduto: ITbProduto) {
    this.editForm.patchValue({
      id: tbProduto.id,
      nmProduto: tbProduto.nmProduto,
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
    const novoProduto: TbProduto = this.tbProduto;
    const estoqueAtual: number = novoProduto.qtdEstoque;
    const tipo: number = parseInt(this.editForm.get(['tipo']).value, 10);
    let estoqueAlteracao: number;
    if (tipo === 1) {
      estoqueAlteracao = parseInt(this.editForm.get(['qtdAlterar']).value, 10);
    } else {
      estoqueAlteracao = -1 * parseInt(this.editForm.get(['qtdAlterar']).value, 10);
    }

    novoProduto.qtdEstoque = estoqueAtual + estoqueAlteracao;

    novoProduto.situacao = novoProduto.qtdEstoque / novoProduto.qtdMin;
    return novoProduto;
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
}
