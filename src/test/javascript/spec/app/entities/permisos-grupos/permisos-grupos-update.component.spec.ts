import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { PermisosGruposUpdateComponent } from 'app/entities/permisos-grupos/permisos-grupos-update.component';
import { PermisosGruposService } from 'app/entities/permisos-grupos/permisos-grupos.service';
import { PermisosGrupos } from 'app/shared/model/permisos-grupos.model';

describe('Component Tests', () => {
  describe('PermisosGrupos Management Update Component', () => {
    let comp: PermisosGruposUpdateComponent;
    let fixture: ComponentFixture<PermisosGruposUpdateComponent>;
    let service: PermisosGruposService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [PermisosGruposUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PermisosGruposUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PermisosGruposUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PermisosGruposService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PermisosGrupos(123);
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
        const entity = new PermisosGrupos();
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
