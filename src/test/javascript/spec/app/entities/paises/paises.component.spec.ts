import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { PaisesComponent } from 'app/entities/paises/paises.component';
import { PaisesService } from 'app/entities/paises/paises.service';
import { Paises } from 'app/shared/model/paises.model';

describe('Component Tests', () => {
  describe('Paises Management Component', () => {
    let comp: PaisesComponent;
    let fixture: ComponentFixture<PaisesComponent>;
    let service: PaisesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [PaisesComponent],
      })
        .overrideTemplate(PaisesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaisesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaisesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Paises(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paises && comp.paises[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
