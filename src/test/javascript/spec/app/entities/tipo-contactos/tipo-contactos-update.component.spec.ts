import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { TipoContactosUpdateComponent } from 'app/entities/tipo-contactos/tipo-contactos-update.component';
import { TipoContactosService } from 'app/entities/tipo-contactos/tipo-contactos.service';
import { TipoContactos } from 'app/shared/model/tipo-contactos.model';

describe('Component Tests', () => {
  describe('TipoContactos Management Update Component', () => {
    let comp: TipoContactosUpdateComponent;
    let fixture: ComponentFixture<TipoContactosUpdateComponent>;
    let service: TipoContactosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [TipoContactosUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TipoContactosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoContactosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoContactosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoContactos(123);
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
        const entity = new TipoContactos();
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
