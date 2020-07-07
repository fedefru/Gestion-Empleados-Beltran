import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { EntidadesUsuariosComponent } from 'app/entities/entidades-usuarios/entidades-usuarios.component';
import { EntidadesUsuariosService } from 'app/entities/entidades-usuarios/entidades-usuarios.service';
import { EntidadesUsuarios } from 'app/shared/model/entidades-usuarios.model';

describe('Component Tests', () => {
  describe('EntidadesUsuarios Management Component', () => {
    let comp: EntidadesUsuariosComponent;
    let fixture: ComponentFixture<EntidadesUsuariosComponent>;
    let service: EntidadesUsuariosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EntidadesUsuariosComponent],
      })
        .overrideTemplate(EntidadesUsuariosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntidadesUsuariosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntidadesUsuariosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EntidadesUsuarios(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.entidadesUsuarios && comp.entidadesUsuarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
