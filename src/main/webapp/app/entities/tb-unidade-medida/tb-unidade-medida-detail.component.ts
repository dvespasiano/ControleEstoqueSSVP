import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITbUnidadeMedida } from 'app/shared/model/tb-unidade-medida.model';

@Component({
  selector: 'jhi-tb-unidade-medida-detail',
  templateUrl: './tb-unidade-medida-detail.component.html'
})
export class TbUnidadeMedidaDetailComponent implements OnInit {
  tbUnidadeMedida: ITbUnidadeMedida;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tbUnidadeMedida }) => {
      this.tbUnidadeMedida = tbUnidadeMedida;
    });
  }

  previousState() {
    window.history.back();
  }
}
