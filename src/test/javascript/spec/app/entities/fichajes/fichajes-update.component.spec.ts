import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { FichajesUpdateComponent } from 'app/entities/fichajes/fichajes-update.component';
import { FichajesService } from 'app/entities/fichajes/fichajes.service';
import { Fichajes } from 'app/shared/model/fichajes.model';

describe('Component Tests', () => {
  describe('Fichajes Management Update Component', () => {
    let comp: FichajesUpdateComponent;
    let fixture: ComponentFixture<FichajesUpdateComponent>;
    let service: FichajesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [FichajesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FichajesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FichajesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FichajesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fichajes(123);
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
        const entity = new Fichajes();
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
