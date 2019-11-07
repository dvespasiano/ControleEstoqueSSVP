import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ContextoTestModule } from '../../../test.module';
import { TbCategoriaComponent } from 'app/entities/tb-categoria/tb-categoria.component';
import { TbCategoriaService } from 'app/entities/tb-categoria/tb-categoria.service';
import { TbCategoria } from 'app/shared/model/tb-categoria.model';

describe('Component Tests', () => {
  describe('TbCategoria Management Component', () => {
    let comp: TbCategoriaComponent;
    let fixture: ComponentFixture<TbCategoriaComponent>;
    let service: TbCategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContextoTestModule],
        declarations: [TbCategoriaComponent],
        providers: []
      })
        .overrideTemplate(TbCategoriaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TbCategoriaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TbCategoriaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TbCategoria(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tbCategorias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
