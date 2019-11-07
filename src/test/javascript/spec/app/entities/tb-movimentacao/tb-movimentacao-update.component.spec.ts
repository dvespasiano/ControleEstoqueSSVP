import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ContextoTestModule } from '../../../test.module';
import { TbMovimentacaoUpdateComponent } from 'app/entities/tb-movimentacao/tb-movimentacao-update.component';
import { TbMovimentacaoService } from 'app/entities/tb-movimentacao/tb-movimentacao.service';
import { TbMovimentacao } from 'app/shared/model/tb-movimentacao.model';

describe('Component Tests', () => {
  describe('TbMovimentacao Management Update Component', () => {
    let comp: TbMovimentacaoUpdateComponent;
    let fixture: ComponentFixture<TbMovimentacaoUpdateComponent>;
    let service: TbMovimentacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbMovimentacaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TbMovimentacaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TbMovimentacaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TbMovimentacaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TbMovimentacao(123);
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
        const entity = new TbMovimentacao();
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
