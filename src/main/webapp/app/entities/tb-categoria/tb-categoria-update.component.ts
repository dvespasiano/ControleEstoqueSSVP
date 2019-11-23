import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITbCategoria, TbCategoria } from 'app/shared/model/tb-categoria.model';
import { TbCategoriaService } from './tb-categoria.service';
import { ITbProduto } from 'app/shared/model/tb-produto.model';
import { TbProdutoService } from 'app/entities/tb-produto/tb-produto.service';

@Component({
  selector: 'jhi-tb-categoria-update',
  templateUrl: './tb-categoria-update.component.html'
})
export class TbCategoriaUpdateComponent implements OnInit {
  isSaving: boolean;

  tbprodutos: ITbProduto[];

  editForm = this.fb.group({
    id: [],
    idTbCategoria: [],
    nmCategoria: [],
    idCategoria: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tbCategoriaService: TbCategoriaService,
    protected tbProdutoService: TbProdutoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tbCategoria }) => {
      this.updateForm(tbCategoria);
    });
    this.tbProdutoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITbProduto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITbProduto[]>) => response.body)
      )
      .subscribe((res: ITbProduto[]) => (this.tbprodutos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tbCategoria: ITbCategoria) {
    this.editForm.patchValue({
      id: tbCategoria.id,
      nmCategoria: tbCategoria.nmCategoria
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tbCategoria = this.createFromForm();
    if (tbCategoria.id !== undefined) {
      this.subscribeToSaveResponse(this.tbCategoriaService.update(tbCategoria));
    } else {
      this.subscribeToSaveResponse(this.tbCategoriaService.create(tbCategoria));
    }
  }

  private createFromForm(): ITbCategoria {
    return {
      ...new TbCategoria(),
      id: this.editForm.get(['id']).value,
      nmCategoria: this.editForm.get(['nmCategoria']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITbCategoria>>) {
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
}
