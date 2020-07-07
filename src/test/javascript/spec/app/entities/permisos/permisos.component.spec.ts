import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { PermisosComponent } from 'app/entities/permisos/permisos.component';
import { PermisosService } from 'app/entities/permisos/permisos.service';
import { Permisos } from 'app/shared/model/permisos.model';

describe('Component Tests', () => {
  describe('Permisos Management Component', () => {
    let comp: PermisosComponent;
    let fixture: ComponentFixture<PermisosComponent>;
    let service: PermisosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [PermisosComponent],
      })
        .overrideTemplate(PermisosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PermisosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PermisosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Permisos(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.permisos && comp.permisos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
