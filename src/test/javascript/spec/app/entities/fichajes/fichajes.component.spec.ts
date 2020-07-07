import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { FichajesComponent } from 'app/entities/fichajes/fichajes.component';
import { FichajesService } from 'app/entities/fichajes/fichajes.service';
import { Fichajes } from 'app/shared/model/fichajes.model';

describe('Component Tests', () => {
  describe('Fichajes Management Component', () => {
    let comp: FichajesComponent;
    let fixture: ComponentFixture<FichajesComponent>;
    let service: FichajesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [FichajesComponent],
      })
        .overrideTemplate(FichajesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FichajesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FichajesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Fichajes(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fichajes && comp.fichajes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
