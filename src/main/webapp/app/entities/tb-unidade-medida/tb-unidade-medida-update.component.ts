import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITbUnidadeMedida, TbUnidadeMedida } from 'app/shared/model/tb-unidade-medida.model';
import { TbUnidadeMedidaService } from './tb-unidade-medida.service';
import { ITbProduto } from 'app/shared/model/tb-produto.model';
import { TbProdutoService } from 'app/entities/tb-produto/tb-produto.service';

@Component({
  selector: 'jhi-tb-unidade-medida-update',
  templateUrl: './tb-unidade-medida-update.component.html'
})
export class TbUnidadeMedidaUpdateComponent implements OnInit {
  isSaving: boolean;

  tbprodutos: ITbProduto[];

  editForm = this.fb.group({
    id: [],
    idTbUnidadeMedida: [],
    nmUnidadeMedida: [],
    idUnidadeMedida: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tbUnidadeMedidaService: TbUnidadeMedidaService,
    protected tbProdutoService: TbProdutoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tbUnidadeMedida }) => {
      this.updateForm(tbUnidadeMedida);
    });
    this.tbProdutoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITbProduto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITbProduto[]>) => response.body)
      )
      .subscribe((res: ITbProduto[]) => (this.tbprodutos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tbUnidadeMedida: ITbUnidadeMedida) {
    this.editForm.patchValue({
      id: tbUnidadeMedida.id,
      nmUnidadeMedida: tbUnidadeMedida.nmUnidadeMedida
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tbUnidadeMedida = this.createFromForm();
    if (tbUnidadeMedida.id !== undefined) {
      this.subscribeToSaveResponse(this.tbUnidadeMedidaService.update(tbUnidadeMedida));
    } else {
      this.subscribeToSaveResponse(this.tbUnidadeMedidaService.create(tbUnidadeMedida));
    }
  }

  private createFromForm(): ITbUnidadeMedida {
    return {
      ...new TbUnidadeMedida(),
      id: this.editForm.get(['id']).value,
      nmUnidadeMedida: this.editForm.get(['nmUnidadeMedida']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITbUnidadeMedida>>) {
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
