import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { EntidadesEmpresasComponent } from 'app/entities/entidades-empresas/entidades-empresas.component';
import { EntidadesEmpresasService } from 'app/entities/entidades-empresas/entidades-empresas.service';
import { EntidadesEmpresas } from 'app/shared/model/entidades-empresas.model';

describe('Component Tests', () => {
  describe('EntidadesEmpresas Management Component', () => {
    let comp: EntidadesEmpresasComponent;
    let fixture: ComponentFixture<EntidadesEmpresasComponent>;
    let service: EntidadesEmpresasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EntidadesEmpresasComponent],
      })
        .overrideTemplate(EntidadesEmpresasComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntidadesEmpresasComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntidadesEmpresasService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EntidadesEmpresas(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.entidadesEmpresas && comp.entidadesEmpresas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
