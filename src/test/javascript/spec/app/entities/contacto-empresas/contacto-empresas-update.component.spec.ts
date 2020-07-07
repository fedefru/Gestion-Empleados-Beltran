import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { ContactoEmpresasUpdateComponent } from 'app/entities/contacto-empresas/contacto-empresas-update.component';
import { ContactoEmpresasService } from 'app/entities/contacto-empresas/contacto-empresas.service';
import { ContactoEmpresas } from 'app/shared/model/contacto-empresas.model';

describe('Component Tests', () => {
  describe('ContactoEmpresas Management Update Component', () => {
    let comp: ContactoEmpresasUpdateComponent;
    let fixture: ComponentFixture<ContactoEmpresasUpdateComponent>;
    let service: ContactoEmpresasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [ContactoEmpresasUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ContactoEmpresasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContactoEmpresasUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactoEmpresasService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContactoEmpresas(123);
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
        const entity = new ContactoEmpresas();
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
