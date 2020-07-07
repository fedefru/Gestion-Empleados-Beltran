import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { TipoDocumentosDetailComponent } from 'app/entities/tipo-documentos/tipo-documentos-detail.component';
import { TipoDocumentos } from 'app/shared/model/tipo-documentos.model';

describe('Component Tests', () => {
  describe('TipoDocumentos Management Detail Component', () => {
    let comp: TipoDocumentosDetailComponent;
    let fixture: ComponentFixture<TipoDocumentosDetailComponent>;
    const route = ({ data: of({ tipoDocumentos: new TipoDocumentos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [TipoDocumentosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TipoDocumentosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoDocumentosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoDocumentos on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoDocumentos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
