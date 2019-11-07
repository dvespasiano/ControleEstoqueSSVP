import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContextoTestModule } from '../../../test.module';
import { TbMovimentacaoDetailComponent } from 'app/entities/tb-movimentacao/tb-movimentacao-detail.component';
import { TbMovimentacao } from 'app/shared/model/tb-movimentacao.model';

describe('Component Tests', () => {
  describe('TbMovimentacao Management Detail Component', () => {
    let comp: TbMovimentacaoDetailComponent;
    let fixture: ComponentFixture<TbMovimentacaoDetailComponent>;
    const route = ({ data: of({ tbMovimentacao: new TbMovimentacao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbMovimentacaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TbMovimentacaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TbMovimentacaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tbMovimentacao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
