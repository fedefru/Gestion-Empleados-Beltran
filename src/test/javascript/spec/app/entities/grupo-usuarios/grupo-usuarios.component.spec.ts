import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { GrupoUsuariosComponent } from 'app/entities/grupo-usuarios/grupo-usuarios.component';
import { GrupoUsuariosService } from 'app/entities/grupo-usuarios/grupo-usuarios.service';
import { GrupoUsuarios } from 'app/shared/model/grupo-usuarios.model';

describe('Component Tests', () => {
  describe('GrupoUsuarios Management Component', () => {
    let comp: GrupoUsuariosComponent;
    let fixture: ComponentFixture<GrupoUsuariosComponent>;
    let service: GrupoUsuariosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [GrupoUsuariosComponent],
      })
        .overrideTemplate(GrupoUsuariosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GrupoUsuariosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GrupoUsuariosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GrupoUsuarios(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.grupoUsuarios && comp.grupoUsuarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
