import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { ProvinciasUpdateComponent } from 'app/entities/provincias/provincias-update.component';
import { ProvinciasService } from 'app/entities/provincias/provincias.service';
import { Provincias } from 'app/shared/model/provincias.model';

describe('Component Tests', () => {
  describe('Provincias Management Update Component', () => {
    let comp: ProvinciasUpdateComponent;
    let fixture: ComponentFixture<ProvinciasUpdateComponent>;
    let service: ProvinciasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [ProvinciasUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProvinciasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProvinciasUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProvinciasService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Provincias(123);
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
        const entity = new Provincias();
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
