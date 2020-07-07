import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { TipoDireccionComponent } from 'app/entities/tipo-direccion/tipo-direccion.component';
import { TipoDireccionService } from 'app/entities/tipo-direccion/tipo-direccion.service';
import { TipoDireccion } from 'app/shared/model/tipo-direccion.model';

describe('Component Tests', () => {
  describe('TipoDireccion Management Component', () => {
    let comp: TipoDireccionComponent;
    let fixture: ComponentFixture<TipoDireccionComponent>;
    let service: TipoDireccionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [TipoDireccionComponent],
      })
        .overrideTemplate(TipoDireccionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoDireccionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoDireccionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoDireccion(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoDireccions && comp.tipoDireccions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
