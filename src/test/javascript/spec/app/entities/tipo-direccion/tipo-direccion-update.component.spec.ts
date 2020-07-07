import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { TipoDireccionUpdateComponent } from 'app/entities/tipo-direccion/tipo-direccion-update.component';
import { TipoDireccionService } from 'app/entities/tipo-direccion/tipo-direccion.service';
import { TipoDireccion } from 'app/shared/model/tipo-direccion.model';

describe('Component Tests', () => {
  describe('TipoDireccion Management Update Component', () => {
    let comp: TipoDireccionUpdateComponent;
    let fixture: ComponentFixture<TipoDireccionUpdateComponent>;
    let service: TipoDireccionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [TipoDireccionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TipoDireccionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoDireccionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoDireccionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoDireccion(123);
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
        const entity = new TipoDireccion();
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
