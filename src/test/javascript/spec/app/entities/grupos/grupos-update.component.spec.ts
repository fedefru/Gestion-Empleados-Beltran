import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { GruposUpdateComponent } from 'app/entities/grupos/grupos-update.component';
import { GruposService } from 'app/entities/grupos/grupos.service';
import { Grupos } from 'app/shared/model/grupos.model';

describe('Component Tests', () => {
  describe('Grupos Management Update Component', () => {
    let comp: GruposUpdateComponent;
    let fixture: ComponentFixture<GruposUpdateComponent>;
    let service: GruposService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [GruposUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GruposUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GruposUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GruposService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Grupos(123);
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
        const entity = new Grupos();
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
