import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { ContactoUsuariosUpdateComponent } from 'app/entities/contacto-usuarios/contacto-usuarios-update.component';
import { ContactoUsuariosService } from 'app/entities/contacto-usuarios/contacto-usuarios.service';
import { ContactoUsuarios } from 'app/shared/model/contacto-usuarios.model';

describe('Component Tests', () => {
  describe('ContactoUsuarios Management Update Component', () => {
    let comp: ContactoUsuariosUpdateComponent;
    let fixture: ComponentFixture<ContactoUsuariosUpdateComponent>;
    let service: ContactoUsuariosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [ContactoUsuariosUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ContactoUsuariosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContactoUsuariosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactoUsuariosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContactoUsuarios(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContactoUsuarios();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
