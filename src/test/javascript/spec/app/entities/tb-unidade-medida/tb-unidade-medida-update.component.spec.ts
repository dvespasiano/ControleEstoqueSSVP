import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ContextoTestModule } from '../../../test.module';
import { TbUnidadeMedidaUpdateComponent } from 'app/entities/tb-unidade-medida/tb-unidade-medida-update.component';
import { TbUnidadeMedidaService } from 'app/entities/tb-unidade-medida/tb-unidade-medida.service';
import { TbUnidadeMedida } from 'app/shared/model/tb-unidade-medida.model';

describe('Component Tests', () => {
  describe('TbUnidadeMedida Management Update Component', () => {
    let comp: TbUnidadeMedidaUpdateComponent;
    let fixture: ComponentFixture<TbUnidadeMedidaUpdateComponent>;
    let service: TbUnidadeMedidaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbUnidadeMedidaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TbUnidadeMedidaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TbUnidadeMedidaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TbUnidadeMedidaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TbUnidadeMedida(123);
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
        const entity = new TbUnidadeMedida();
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
