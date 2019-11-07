import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITbCategoria } from 'app/shared/model/tb-categoria.model';
import { TbCategoriaService } from './tb-categoria.service';

@Component({
  selector: 'jhi-tb-categoria-delete-dialog',
  templateUrl: './tb-categoria-delete-dialog.component.html'
})
export class TbCategoriaDeleteDialogComponent {
  tbCategoria: ITbCategoria;

  constructor(
    protected tbCategoriaService: TbCategoriaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tbCategoriaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tbCategoriaListModification',
        content: 'Deleted an tbCategoria'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tb-categoria-delete-popup',
  template: ''
})
export class TbCategoriaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tbCategoria }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TbCategoriaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tbCategoria = tbCategoria;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tb-categoria', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tb-categoria', { outlets: { popup: null } }]);
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
