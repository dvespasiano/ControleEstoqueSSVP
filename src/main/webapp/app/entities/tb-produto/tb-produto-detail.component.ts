import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITbProduto } from 'app/shared/model/tb-produto.model';

@Component({
  selector: 'jhi-tb-produto-detail',
  templateUrl: './tb-produto-detail.component.html'
})
export class TbProdutoDetailComponent implements OnInit {
  tbProduto: ITbProduto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tbProduto }) => {
      this.tbProduto = tbProduto;
    });
  }

  previousState() {
    window.history.back();
  }
}
