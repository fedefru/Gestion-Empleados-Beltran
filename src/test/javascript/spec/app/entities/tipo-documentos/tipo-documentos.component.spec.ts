import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { TipoDocumentosComponent } from 'app/entities/tipo-documentos/tipo-documentos.component';
import { TipoDocumentosService } from 'app/entities/tipo-documentos/tipo-documentos.service';
import { TipoDocumentos } from 'app/shared/model/tipo-documentos.model';

describe('Component Tests', () => {
  describe('TipoDocumentos Management Component', () => {
    let comp: TipoDocumentosComponent;
    let fixture: ComponentFixture<TipoDocumentosComponent>;
    let service: TipoDocumentosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [TipoDocumentosComponent],
      })
        .overrideTemplate(TipoDocumentosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoDocumentosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoDocumentosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoDocumentos(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoDocumentos && comp.tipoDocumentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
