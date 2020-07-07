import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { CiudadesComponent } from 'app/entities/ciudades/ciudades.component';
import { CiudadesService } from 'app/entities/ciudades/ciudades.service';
import { Ciudades } from 'app/shared/model/ciudades.model';

describe('Component Tests', () => {
  describe('Ciudades Management Component', () => {
    let comp: CiudadesComponent;
    let fixture: ComponentFixture<CiudadesComponent>;
    let service: CiudadesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [CiudadesComponent],
      })
        .overrideTemplate(CiudadesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CiudadesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CiudadesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ciudades(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ciudades && comp.ciudades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
