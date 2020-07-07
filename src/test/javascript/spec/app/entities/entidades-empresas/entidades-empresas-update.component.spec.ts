import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { EntidadesEmpresasUpdateComponent } from 'app/entities/entidades-empresas/entidades-empresas-update.component';
import { EntidadesEmpresasService } from 'app/entities/entidades-empresas/entidades-empresas.service';
import { EntidadesEmpresas } from 'app/shared/model/entidades-empresas.model';

describe('Component Tests', () => {
  describe('EntidadesEmpresas Management Update Component', () => {
    let comp: EntidadesEmpresasUpdateComponent;
    let fixture: ComponentFixture<EntidadesEmpresasUpdateComponent>;
    let service: EntidadesEmpresasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EntidadesEmpresasUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EntidadesEmpresasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntidadesEmpresasUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntidadesEmpresasService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EntidadesEmpresas(123);
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
        const entity = new EntidadesEmpresas();
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
