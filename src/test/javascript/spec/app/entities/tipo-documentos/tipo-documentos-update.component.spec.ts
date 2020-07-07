import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { TipoDocumentosUpdateComponent } from 'app/entities/tipo-documentos/tipo-documentos-update.component';
import { TipoDocumentosService } from 'app/entities/tipo-documentos/tipo-documentos.service';
import { TipoDocumentos } from 'app/shared/model/tipo-documentos.model';

describe('Component Tests', () => {
  describe('TipoDocumentos Management Update Component', () => {
    let comp: TipoDocumentosUpdateComponent;
    let fixture: ComponentFixture<TipoDocumentosUpdateComponent>;
    let service: TipoDocumentosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [TipoDocumentosUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TipoDocumentosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoDocumentosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoDocumentosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoDocumentos(123);
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
        const entity = new TipoDocumentos();
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
