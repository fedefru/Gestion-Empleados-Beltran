import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { ProvinciasComponent } from 'app/entities/provincias/provincias.component';
import { ProvinciasService } from 'app/entities/provincias/provincias.service';
import { Provincias } from 'app/shared/model/provincias.model';

describe('Component Tests', () => {
  describe('Provincias Management Component', () => {
    let comp: ProvinciasComponent;
    let fixture: ComponentFixture<ProvinciasComponent>;
    let service: ProvinciasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [ProvinciasComponent],
      })
        .overrideTemplate(ProvinciasComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProvinciasComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProvinciasService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Provincias(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.provincias && comp.provincias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
