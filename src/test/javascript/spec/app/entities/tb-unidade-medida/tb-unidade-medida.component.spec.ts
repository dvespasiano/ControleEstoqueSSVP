import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ContextoTestModule } from '../../../test.module';
import { TbUnidadeMedidaComponent } from 'app/entities/tb-unidade-medida/tb-unidade-medida.component';
import { TbUnidadeMedidaService } from 'app/entities/tb-unidade-medida/tb-unidade-medida.service';
import { TbUnidadeMedida } from 'app/shared/model/tb-unidade-medida.model';

describe('Component Tests', () => {
  describe('TbUnidadeMedida Management Component', () => {
    let comp: TbUnidadeMedidaComponent;
    let fixture: ComponentFixture<TbUnidadeMedidaComponent>;
    let service: TbUnidadeMedidaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbUnidadeMedidaComponent],
        providers: []
      })
        .overrideTemplate(TbUnidadeMedidaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TbUnidadeMedidaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TbUnidadeMedidaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TbUnidadeMedida(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tbUnidadeMedidas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
