import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { ConfiguracionesUpdateComponent } from 'app/entities/configuraciones/configuraciones-update.component';
import { ConfiguracionesService } from 'app/entities/configuraciones/configuraciones.service';
import { Configuraciones } from 'app/shared/model/configuraciones.model';

describe('Component Tests', () => {
  describe('Configuraciones Management Update Component', () => {
    let comp: ConfiguracionesUpdateComponent;
    let fixture: ComponentFixture<ConfiguracionesUpdateComponent>;
    let service: ConfiguracionesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [ConfiguracionesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ConfiguracionesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConfiguracionesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConfiguracionesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Configuraciones(123);
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
        const entity = new Configuraciones();
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
