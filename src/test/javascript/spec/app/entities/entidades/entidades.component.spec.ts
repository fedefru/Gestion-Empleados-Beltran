import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { EntidadesComponent } from 'app/entities/entidades/entidades.component';
import { EntidadesService } from 'app/entities/entidades/entidades.service';
import { Entidades } from 'app/shared/model/entidades.model';

describe('Component Tests', () => {
  describe('Entidades Management Component', () => {
    let comp: EntidadesComponent;
    let fixture: ComponentFixture<EntidadesComponent>;
    let service: EntidadesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EntidadesComponent],
      })
        .overrideTemplate(EntidadesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntidadesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntidadesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Entidades(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.entidades && comp.entidades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
