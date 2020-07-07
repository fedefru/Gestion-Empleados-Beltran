import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { PuestosComponent } from 'app/entities/puestos/puestos.component';
import { PuestosService } from 'app/entities/puestos/puestos.service';
import { Puestos } from 'app/shared/model/puestos.model';

describe('Component Tests', () => {
  describe('Puestos Management Component', () => {
    let comp: PuestosComponent;
    let fixture: ComponentFixture<PuestosComponent>;
    let service: PuestosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [PuestosComponent],
      })
        .overrideTemplate(PuestosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PuestosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PuestosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Puestos(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.puestos && comp.puestos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
