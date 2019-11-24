import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITbMovimentacao, TbMovimentacao } from 'app/shared/model/tb-movimentacao.model';
import { TbMovimentacaoService } from './tb-movimentacao.service';
import { ITbProduto } from 'app/shared/model/tb-produto.model';
import { TbProdutoService } from 'app/entities/tb-produto/tb-produto.service';

@Component({
  selector: 'jhi-tb-movimentacao-update',
  templateUrl: './tb-movimentacao-update.component.html'
})
export class TbMovimentacaoUpdateComponent implements OnInit {
  isSaving: boolean;

  tbprodutos: ITbProduto[];
  dataDp: any;

  editForm = this.fb.group({
    id: [],
    idTbMovimentacao: [],
    quantidade: [],
    data: [],
    entrada: [],
    tbProdutos: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tbMovimentacaoService: TbMovimentacaoService,
    protected tbProdutoService: TbProdutoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tbMovimentacao }) => {
      this.updateForm(tbMovimentacao);
    });
    this.tbProdutoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITbProduto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITbProduto[]>) => response.body)
      )
      .subscribe((res: ITbProduto[]) => (this.tbprodutos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tbMovimentacao: ITbMovimentacao) {
    this.editForm.patchValue({
      id: tbMovimentacao.id,
      idProduto: tbMovimentacao.produto.id,
      quantidade: tbMovimentacao.quantidade,
      data: tbMovimentacao.data,
      entrada: tbMovimentacao.entrada
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tbMovimentacao = this.createFromForm();
    if (tbMovimentacao.id !== undefined) {
      this.subscribeToSaveResponse(this.tbMovimentacaoService.update(tbMovimentacao));
    } else {
      this.subscribeToSaveResponse(this.tbMovimentacaoService.create(tbMovimentacao));
    }
  }

  private createFromForm(): ITbMovimentacao {
    return {
      ...new TbMovimentacao(),
      id: this.editForm.get(['id']).value,
      idProduto: this.editForm.get(['idProduto']).value,
      quantidade: this.editForm.get(['quantidade']).value,
      data: this.editForm.get(['data']).value,
      entrada: this.editForm.get(['entrada']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITbMovimentacao>>) {
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

  trackTbProdutoById(index: number, item: ITbProduto) {
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
