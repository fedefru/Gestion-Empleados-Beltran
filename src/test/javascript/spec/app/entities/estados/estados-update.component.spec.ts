import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { EstadosUpdateComponent } from 'app/entities/estados/estados-update.component';
import { EstadosService } from 'app/entities/estados/estados.service';
import { Estados } from 'app/shared/model/estados.model';

describe('Component Tests', () => {
  describe('Estados Management Update Component', () => {
    let comp: EstadosUpdateComponent;
    let fixture: ComponentFixture<EstadosUpdateComponent>;
    let service: EstadosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EstadosUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EstadosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Estados(123);
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
        const entity = new Estados();
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
