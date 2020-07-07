import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { PaisesUpdateComponent } from 'app/entities/paises/paises-update.component';
import { PaisesService } from 'app/entities/paises/paises.service';
import { Paises } from 'app/shared/model/paises.model';

describe('Component Tests', () => {
  describe('Paises Management Update Component', () => {
    let comp: PaisesUpdateComponent;
    let fixture: ComponentFixture<PaisesUpdateComponent>;
    let service: PaisesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [PaisesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PaisesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaisesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaisesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Paises(123);
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
        const entity = new Paises();
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
