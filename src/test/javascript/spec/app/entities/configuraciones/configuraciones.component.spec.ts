import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { ConfiguracionesComponent } from 'app/entities/configuraciones/configuraciones.component';
import { ConfiguracionesService } from 'app/entities/configuraciones/configuraciones.service';
import { Configuraciones } from 'app/shared/model/configuraciones.model';

describe('Component Tests', () => {
  describe('Configuraciones Management Component', () => {
    let comp: ConfiguracionesComponent;
    let fixture: ComponentFixture<ConfiguracionesComponent>;
    let service: ConfiguracionesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [ConfiguracionesComponent],
      })
        .overrideTemplate(ConfiguracionesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConfiguracionesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConfiguracionesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Configuraciones(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.configuraciones && comp.configuraciones[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
