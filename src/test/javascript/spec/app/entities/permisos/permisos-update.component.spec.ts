import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { PermisosUpdateComponent } from 'app/entities/permisos/permisos-update.component';
import { PermisosService } from 'app/entities/permisos/permisos.service';
import { Permisos } from 'app/shared/model/permisos.model';

describe('Component Tests', () => {
  describe('Permisos Management Update Component', () => {
    let comp: PermisosUpdateComponent;
    let fixture: ComponentFixture<PermisosUpdateComponent>;
    let service: PermisosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [PermisosUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PermisosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PermisosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PermisosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Permisos(123);
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
        const entity = new Permisos();
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
