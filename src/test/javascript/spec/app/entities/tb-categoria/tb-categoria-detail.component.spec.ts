import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContextoTestModule } from '../../../test.module';
import { TbCategoriaDetailComponent } from 'app/entities/tb-categoria/tb-categoria-detail.component';
import { TbCategoria } from 'app/shared/model/tb-categoria.model';

describe('Component Tests', () => {
  describe('TbCategoria Management Detail Component', () => {
    let comp: TbCategoriaDetailComponent;
    let fixture: ComponentFixture<TbCategoriaDetailComponent>;
    const route = ({ data: of({ tbCategoria: new TbCategoria(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbCategoriaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TbCategoriaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TbCategoriaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tbCategoria).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
