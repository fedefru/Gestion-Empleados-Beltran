import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { ContactoEmpresasComponent } from 'app/entities/contacto-empresas/contacto-empresas.component';
import { ContactoEmpresasService } from 'app/entities/contacto-empresas/contacto-empresas.service';
import { ContactoEmpresas } from 'app/shared/model/contacto-empresas.model';

describe('Component Tests', () => {
  describe('ContactoEmpresas Management Component', () => {
    let comp: ContactoEmpresasComponent;
    let fixture: ComponentFixture<ContactoEmpresasComponent>;
    let service: ContactoEmpresasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [ContactoEmpresasComponent],
      })
        .overrideTemplate(ContactoEmpresasComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContactoEmpresasComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactoEmpresasService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ContactoEmpresas(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.contactoEmpresas && comp.contactoEmpresas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
