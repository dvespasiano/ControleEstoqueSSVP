import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITbProduto } from 'app/shared/model/tb-produto.model';
import { TbProdutoService } from './tb-produto.service';

@Component({
  selector: 'jhi-tb-produto-delete-dialog',
  templateUrl: './tb-produto-delete-dialog.component.html'
})
export class TbProdutoDeleteDialogComponent {
  tbProduto: ITbProduto;

  constructor(protected tbProdutoService: TbProdutoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tbProduto.ativo = 0;
    this.tbProdutoService.update(this.tbProduto).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tbProdutoListModification',
        content: 'Deleted an tbProduto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tb-produto-delete-popup',
  template: ''
})
export class TbProdutoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tbProduto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TbProdutoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tbProduto = tbProduto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tb-produto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tb-produto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
