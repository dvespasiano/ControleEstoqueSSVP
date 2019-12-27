import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITbProduto, TbProduto } from 'app/shared/model/tb-produto.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { TbProdutoService } from './tb-produto.service';
import { ITbMovimentacao, TbMovimentacao } from 'app/shared/model/tb-movimentacao.model';
import { TbMovimentacaoService } from 'app/entities/tb-movimentacao/tb-movimentacao.service';
import * as moment from 'moment';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'jhi-tb-produto-detail',
  templateUrl: './tb-produto-detail.component.html'
})
export class TbProdutoDetailComponent implements OnInit {
  tbProduto: ITbProduto;
  isSaving: boolean;
  tbmovimentacaos: ITbMovimentacao[];

  editForm = this.fb.group({
    qtdAlterar: ['', [Validators.required, this.invalidaValNeg]],
    tipo: ['', Validators.required]
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

  invalidaValNeg(input) {
    return ValidatorService.invalidaValNeg(input);
  }

  invalidaValMov(input) {
    return ValidatorService.invalidaValMov(input, this.tbProduto.qtdEstoque, this.editForm.get('tipo').value);
  }

  naoPreenchido(input) {
    return ValidatorService.naoPreenchido(input);
  }

  updateForm(tbProduto: ITbProduto) {
    this.editForm.patchValue({
      qtdAlterar: null,
      tipo: null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    if (this.editForm.get(['qtdAlterar']).value > this.tbProduto.qtdEstoque && this.editForm.get(['tipo']).value === '0') {
      alert(
        'A quantidade de saida informada é maior que estoque atual!\n' +
          "Verifique se você não errou o valor ou se você marcou 'saida' em vez de 'entrada'"
      );
    } else {
      this.isSaving = true;
      const tbProduto: ITbProduto = this.createFromForm();
      const tbMovimentacao: ITbMovimentacao = new TbMovimentacao();
      tbMovimentacao.data = moment().tz('America/Sao_Paulo');
      tbMovimentacao.entrada = parseInt(this.editForm.get(['tipo']).value, 10);
      tbMovimentacao.quantidade = parseInt(this.editForm.get(['qtdAlterar']).value, 10);
      tbMovimentacao.produto = tbProduto;
      tbMovimentacao.saldoAnt =
        tbProduto.qtdEstoque + (tbMovimentacao.entrada === 1 ? -tbMovimentacao.quantidade : tbMovimentacao.quantidade);
      this.subscribeToSaveResponseProduto(this.tbProdutoService.update(tbProduto));
      this.subscribeToSaveResponseMovimentacao(this.tbMovimentacaoService.create(tbMovimentacao));
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
      estoqueAlteracao = -parseInt(this.editForm.get(['qtdAlterar']).value, 10);
    }

    novoProduto.qtdEstoque = estoqueAtual + estoqueAlteracao;

    novoProduto.situacao = novoProduto.qtdEstoque / novoProduto.qtdMin;
    return novoProduto;
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
}
