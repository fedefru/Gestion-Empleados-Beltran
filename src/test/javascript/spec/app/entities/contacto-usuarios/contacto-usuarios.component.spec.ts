import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { ContactoUsuariosComponent } from 'app/entities/contacto-usuarios/contacto-usuarios.component';
import { ContactoUsuariosService } from 'app/entities/contacto-usuarios/contacto-usuarios.service';
import { ContactoUsuarios } from 'app/shared/model/contacto-usuarios.model';

describe('Component Tests', () => {
  describe('ContactoUsuarios Management Component', () => {
    let comp: ContactoUsuariosComponent;
    let fixture: ComponentFixture<ContactoUsuariosComponent>;
    let service: ContactoUsuariosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [ContactoUsuariosComponent],
      })
        .overrideTemplate(ContactoUsuariosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContactoUsuariosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactoUsuariosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ContactoUsuarios(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.contactoUsuarios && comp.contactoUsuarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
