import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITbMovimentacao } from 'app/shared/model/tb-movimentacao.model';

@Component({
  selector: 'jhi-tb-movimentacao-detail',
  templateUrl: './tb-movimentacao-detail.component.html'
})
export class TbMovimentacaoDetailComponent implements OnInit {
  tbMovimentacao: ITbMovimentacao;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tbMovimentacao }) => {
      this.tbMovimentacao = tbMovimentacao;
    });
  }

  previousState() {
    window.history.back();
  }
}
