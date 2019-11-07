import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITbCategoria } from 'app/shared/model/tb-categoria.model';

@Component({
  selector: 'jhi-tb-categoria-detail',
  templateUrl: './tb-categoria-detail.component.html'
})
export class TbCategoriaDetailComponent implements OnInit {
  tbCategoria: ITbCategoria;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tbCategoria }) => {
      this.tbCategoria = tbCategoria;
    });
  }

  previousState() {
    window.history.back();
  }
}
