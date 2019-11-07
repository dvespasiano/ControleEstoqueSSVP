import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ContextoTestModule } from '../../../test.module';
import { TbUnidadeMedidaDeleteDialogComponent } from 'app/entities/tb-unidade-medida/tb-unidade-medida-delete-dialog.component';
import { TbUnidadeMedidaService } from 'app/entities/tb-unidade-medida/tb-unidade-medida.service';

describe('Component Tests', () => {
  describe('TbUnidadeMedida Management Delete Component', () => {
    let comp: TbUnidadeMedidaDeleteDialogComponent;
    let fixture: ComponentFixture<TbUnidadeMedidaDeleteDialogComponent>;
    let service: TbUnidadeMedidaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbUnidadeMedidaDeleteDialogComponent]
      })
        .overrideTemplate(TbUnidadeMedidaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TbUnidadeMedidaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TbUnidadeMedidaService);
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
