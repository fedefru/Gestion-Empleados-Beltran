import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { EstadosComponent } from 'app/entities/estados/estados.component';
import { EstadosService } from 'app/entities/estados/estados.service';
import { Estados } from 'app/shared/model/estados.model';

describe('Component Tests', () => {
  describe('Estados Management Component', () => {
    let comp: EstadosComponent;
    let fixture: ComponentFixture<EstadosComponent>;
    let service: EstadosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EstadosComponent],
      })
        .overrideTemplate(EstadosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Estados(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estados && comp.estados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
