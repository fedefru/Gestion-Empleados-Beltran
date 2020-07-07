import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { AreasComponent } from 'app/entities/areas/areas.component';
import { AreasService } from 'app/entities/areas/areas.service';
import { Areas } from 'app/shared/model/areas.model';

describe('Component Tests', () => {
  describe('Areas Management Component', () => {
    let comp: AreasComponent;
    let fixture: ComponentFixture<AreasComponent>;
    let service: AreasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [AreasComponent],
      })
        .overrideTemplate(AreasComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AreasComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AreasService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Areas(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.areas && comp.areas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
