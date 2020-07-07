import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { DireccionesUpdateComponent } from 'app/entities/direcciones/direcciones-update.component';
import { DireccionesService } from 'app/entities/direcciones/direcciones.service';
import { Direcciones } from 'app/shared/model/direcciones.model';

describe('Component Tests', () => {
  describe('Direcciones Management Update Component', () => {
    let comp: DireccionesUpdateComponent;
    let fixture: ComponentFixture<DireccionesUpdateComponent>;
    let service: DireccionesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [DireccionesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DireccionesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DireccionesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DireccionesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Direcciones(123);
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
        const entity = new Direcciones();
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
