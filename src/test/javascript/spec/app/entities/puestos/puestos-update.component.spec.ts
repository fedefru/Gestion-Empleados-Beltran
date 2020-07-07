import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { PuestosUpdateComponent } from 'app/entities/puestos/puestos-update.component';
import { PuestosService } from 'app/entities/puestos/puestos.service';
import { Puestos } from 'app/shared/model/puestos.model';

describe('Component Tests', () => {
  describe('Puestos Management Update Component', () => {
    let comp: PuestosUpdateComponent;
    let fixture: ComponentFixture<PuestosUpdateComponent>;
    let service: PuestosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [PuestosUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PuestosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PuestosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PuestosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Puestos(123);
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
        const entity = new Puestos();
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
