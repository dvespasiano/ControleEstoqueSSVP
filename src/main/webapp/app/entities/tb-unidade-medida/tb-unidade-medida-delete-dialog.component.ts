import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITbUnidadeMedida } from 'app/shared/model/tb-unidade-medida.model';
import { TbUnidadeMedidaService } from './tb-unidade-medida.service';

@Component({
  selector: 'jhi-tb-unidade-medida-delete-dialog',
  templateUrl: './tb-unidade-medida-delete-dialog.component.html'
})
export class TbUnidadeMedidaDeleteDialogComponent {
  tbUnidadeMedida: ITbUnidadeMedida;

  constructor(
    protected tbUnidadeMedidaService: TbUnidadeMedidaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tbUnidadeMedidaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tbUnidadeMedidaListModification',
        content: 'Deleted an tbUnidadeMedida'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tb-unidade-medida-delete-popup',
  template: ''
})
export class TbUnidadeMedidaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tbUnidadeMedida }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TbUnidadeMedidaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tbUnidadeMedida = tbUnidadeMedida;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tb-unidade-medida', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tb-unidade-medida', { outlets: { popup: null } }]);
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
