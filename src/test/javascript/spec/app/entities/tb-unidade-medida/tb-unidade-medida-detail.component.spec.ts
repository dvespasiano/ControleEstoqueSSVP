import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContextoTestModule } from '../../../test.module';
import { TbUnidadeMedidaDetailComponent } from 'app/entities/tb-unidade-medida/tb-unidade-medida-detail.component';
import { TbUnidadeMedida } from 'app/shared/model/tb-unidade-medida.model';

describe('Component Tests', () => {
  describe('TbUnidadeMedida Management Detail Component', () => {
    let comp: TbUnidadeMedidaDetailComponent;
    let fixture: ComponentFixture<TbUnidadeMedidaDetailComponent>;
    const route = ({ data: of({ tbUnidadeMedida: new TbUnidadeMedida(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbUnidadeMedidaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TbUnidadeMedidaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TbUnidadeMedidaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tbUnidadeMedida).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
