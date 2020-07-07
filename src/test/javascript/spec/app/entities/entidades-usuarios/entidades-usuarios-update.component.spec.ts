import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { EntidadesUsuariosUpdateComponent } from 'app/entities/entidades-usuarios/entidades-usuarios-update.component';
import { EntidadesUsuariosService } from 'app/entities/entidades-usuarios/entidades-usuarios.service';
import { EntidadesUsuarios } from 'app/shared/model/entidades-usuarios.model';

describe('Component Tests', () => {
  describe('EntidadesUsuarios Management Update Component', () => {
    let comp: EntidadesUsuariosUpdateComponent;
    let fixture: ComponentFixture<EntidadesUsuariosUpdateComponent>;
    let service: EntidadesUsuariosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EntidadesUsuariosUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EntidadesUsuariosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntidadesUsuariosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntidadesUsuariosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EntidadesUsuarios(123);
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
        const entity = new EntidadesUsuarios();
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
