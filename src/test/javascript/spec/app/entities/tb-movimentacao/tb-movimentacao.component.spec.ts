import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ContextoTestModule } from '../../../test.module';
import { TbMovimentacaoComponent } from 'app/entities/tb-movimentacao/tb-movimentacao.component';
import { TbMovimentacaoService } from 'app/entities/tb-movimentacao/tb-movimentacao.service';
import { TbMovimentacao } from 'app/shared/model/tb-movimentacao.model';

describe('Component Tests', () => {
  describe('TbMovimentacao Management Component', () => {
    let comp: TbMovimentacaoComponent;
    let fixture: ComponentFixture<TbMovimentacaoComponent>;
    let service: TbMovimentacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbMovimentacaoComponent],
        providers: []
      })
        .overrideTemplate(TbMovimentacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TbMovimentacaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TbMovimentacaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TbMovimentacao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tbMovimentacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
