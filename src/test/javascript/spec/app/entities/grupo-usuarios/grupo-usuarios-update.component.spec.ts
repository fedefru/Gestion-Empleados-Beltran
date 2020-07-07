import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { GrupoUsuariosUpdateComponent } from 'app/entities/grupo-usuarios/grupo-usuarios-update.component';
import { GrupoUsuariosService } from 'app/entities/grupo-usuarios/grupo-usuarios.service';
import { GrupoUsuarios } from 'app/shared/model/grupo-usuarios.model';

describe('Component Tests', () => {
  describe('GrupoUsuarios Management Update Component', () => {
    let comp: GrupoUsuariosUpdateComponent;
    let fixture: ComponentFixture<GrupoUsuariosUpdateComponent>;
    let service: GrupoUsuariosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [GrupoUsuariosUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GrupoUsuariosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GrupoUsuariosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GrupoUsuariosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GrupoUsuarios(123);
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
        const entity = new GrupoUsuarios();
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
