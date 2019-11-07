import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITbMovimentacao } from 'app/shared/model/tb-movimentacao.model';
import { TbMovimentacaoService } from './tb-movimentacao.service';

@Component({
  selector: 'jhi-tb-movimentacao-delete-dialog',
  templateUrl: './tb-movimentacao-delete-dialog.component.html'
})
export class TbMovimentacaoDeleteDialogComponent {
  tbMovimentacao: ITbMovimentacao;

  constructor(
    protected tbMovimentacaoService: TbMovimentacaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tbMovimentacaoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tbMovimentacaoListModification',
        content: 'Deleted an tbMovimentacao'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tb-movimentacao-delete-popup',
  template: ''
})
export class TbMovimentacaoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tbMovimentacao }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TbMovimentacaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tbMovimentacao = tbMovimentacao;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tb-movimentacao', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tb-movimentacao', { outlets: { popup: null } }]);
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
