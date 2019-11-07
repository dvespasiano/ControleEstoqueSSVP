import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContextoTestModule } from '../../../test.module';
import { TbProdutoDetailComponent } from 'app/entities/tb-produto/tb-produto-detail.component';
import { TbProduto } from 'app/shared/model/tb-produto.model';

describe('Component Tests', () => {
  describe('TbProduto Management Detail Component', () => {
    let comp: TbProdutoDetailComponent;
    let fixture: ComponentFixture<TbProdutoDetailComponent>;
    const route = ({ data: of({ tbProduto: new TbProduto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbProdutoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TbProdutoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TbProdutoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tbProduto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
