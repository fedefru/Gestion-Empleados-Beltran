import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { DireccionesComponent } from 'app/entities/direcciones/direcciones.component';
import { DireccionesService } from 'app/entities/direcciones/direcciones.service';
import { Direcciones } from 'app/shared/model/direcciones.model';

describe('Component Tests', () => {
  describe('Direcciones Management Component', () => {
    let comp: DireccionesComponent;
    let fixture: ComponentFixture<DireccionesComponent>;
    let service: DireccionesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [DireccionesComponent],
      })
        .overrideTemplate(DireccionesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DireccionesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DireccionesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Direcciones(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.direcciones && comp.direcciones[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
