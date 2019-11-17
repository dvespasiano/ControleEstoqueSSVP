import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITbProduto, TbProduto } from 'app/shared/model/tb-produto.model';
import { TbProdutoService } from './tb-produto.service';
import { ITbMovimentacao } from 'app/shared/model/tb-movimentacao.model';
import { TbMovimentacaoService } from 'app/entities/tb-movimentacao/tb-movimentacao.service';

@Component({
  selector: 'jhi-tb-produto-update',
  templateUrl: './tb-produto-update.component.html'
})
export class TbProdutoUpdateComponent implements OnInit {
  isSaving: boolean;

  tbmovimentacaos: ITbMovimentacao[];

  editForm = this.fb.group({
    id: [],
    idTbProduto: [],
    nmProduto: [],
    qtdEstoque: [],
    qtdMin: [],
    ativo: [],
    nmcategoria: []
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
      idTbProduto: tbProduto.idTbProduto,
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
    return {
      ...new TbProduto(),
      id: this.editForm.get(['id']).value,
      idTbProduto: this.editForm.get(['idTbProduto']).value,
      nmProduto: this.editForm.get(['nmProduto']).value,
      qtdEstoque: this.editForm.get(['qtdEstoque']).value,
      qtdMin: this.editForm.get(['qtdMin']).value,
      ativo: this.editForm.get(['ativo']).value
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
}
