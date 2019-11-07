import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ContextoTestModule } from '../../../test.module';
import { TbCategoriaDeleteDialogComponent } from 'app/entities/tb-categoria/tb-categoria-delete-dialog.component';
import { TbCategoriaService } from 'app/entities/tb-categoria/tb-categoria.service';

describe('Component Tests', () => {
  describe('TbCategoria Management Delete Component', () => {
    let comp: TbCategoriaDeleteDialogComponent;
    let fixture: ComponentFixture<TbCategoriaDeleteDialogComponent>;
    let service: TbCategoriaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbCategoriaDeleteDialogComponent]
      })
        .overrideTemplate(TbCategoriaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TbCategoriaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TbCategoriaService);
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
