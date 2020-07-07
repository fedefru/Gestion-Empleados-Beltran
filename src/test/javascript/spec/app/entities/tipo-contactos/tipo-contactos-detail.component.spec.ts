import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { TipoContactosDetailComponent } from 'app/entities/tipo-contactos/tipo-contactos-detail.component';
import { TipoContactos } from 'app/shared/model/tipo-contactos.model';

describe('Component Tests', () => {
  describe('TipoContactos Management Detail Component', () => {
    let comp: TipoContactosDetailComponent;
    let fixture: ComponentFixture<TipoContactosDetailComponent>;
    const route = ({ data: of({ tipoContactos: new TipoContactos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [TipoContactosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TipoContactosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoContactosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoContactos on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoContactos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
