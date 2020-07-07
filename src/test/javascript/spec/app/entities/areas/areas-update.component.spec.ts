import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { AreasUpdateComponent } from 'app/entities/areas/areas-update.component';
import { AreasService } from 'app/entities/areas/areas.service';
import { Areas } from 'app/shared/model/areas.model';

describe('Component Tests', () => {
  describe('Areas Management Update Component', () => {
    let comp: AreasUpdateComponent;
    let fixture: ComponentFixture<AreasUpdateComponent>;
    let service: AreasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [AreasUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AreasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AreasUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AreasService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Areas(123);
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
        const entity = new Areas();
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
