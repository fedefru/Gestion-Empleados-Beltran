import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { PermisosGruposComponent } from 'app/entities/permisos-grupos/permisos-grupos.component';
import { PermisosGruposService } from 'app/entities/permisos-grupos/permisos-grupos.service';
import { PermisosGrupos } from 'app/shared/model/permisos-grupos.model';

describe('Component Tests', () => {
  describe('PermisosGrupos Management Component', () => {
    let comp: PermisosGruposComponent;
    let fixture: ComponentFixture<PermisosGruposComponent>;
    let service: PermisosGruposService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [PermisosGruposComponent],
      })
        .overrideTemplate(PermisosGruposComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PermisosGruposComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PermisosGruposService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PermisosGrupos(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.permisosGrupos && comp.permisosGrupos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
