import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ContextoTestModule } from '../../../test.module';
import { TbCategoriaUpdateComponent } from 'app/entities/tb-categoria/tb-categoria-update.component';
import { TbCategoriaService } from 'app/entities/tb-categoria/tb-categoria.service';
import { TbCategoria } from 'app/shared/model/tb-categoria.model';

describe('Component Tests', () => {
  describe('TbCategoria Management Update Component', () => {
    let comp: TbCategoriaUpdateComponent;
    let fixture: ComponentFixture<TbCategoriaUpdateComponent>;
    let service: TbCategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbCategoriaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TbCategoriaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TbCategoriaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TbCategoriaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TbCategoria(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TbCategoria();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
