import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { EmpleadosUpdateComponent } from 'app/entities/empleados/empleados-update.component';
import { EmpleadosService } from 'app/entities/empleados/empleados.service';
import { Empleados } from 'app/shared/model/empleados.model';

describe('Component Tests', () => {
  describe('Empleados Management Update Component', () => {
    let comp: EmpleadosUpdateComponent;
    let fixture: ComponentFixture<EmpleadosUpdateComponent>;
    let service: EmpleadosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EmpleadosUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EmpleadosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmpleadosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmpleadosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Empleados(123);
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
        const entity = new Empleados();
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
