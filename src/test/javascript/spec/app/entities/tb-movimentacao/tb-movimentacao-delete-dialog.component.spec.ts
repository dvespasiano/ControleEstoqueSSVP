import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ContextoTestModule } from '../../../test.module';
import { TbMovimentacaoDeleteDialogComponent } from 'app/entities/tb-movimentacao/tb-movimentacao-delete-dialog.component';
import { TbMovimentacaoService } from 'app/entities/tb-movimentacao/tb-movimentacao.service';

describe('Component Tests', () => {
  describe('TbMovimentacao Management Delete Component', () => {
    let comp: TbMovimentacaoDeleteDialogComponent;
    let fixture: ComponentFixture<TbMovimentacaoDeleteDialogComponent>;
    let service: TbMovimentacaoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbMovimentacaoDeleteDialogComponent]
      })
        .overrideTemplate(TbMovimentacaoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TbMovimentacaoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TbMovimentacaoService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
