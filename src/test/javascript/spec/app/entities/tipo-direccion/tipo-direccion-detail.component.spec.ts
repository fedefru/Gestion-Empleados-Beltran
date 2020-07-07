import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { TipoDireccionDetailComponent } from 'app/entities/tipo-direccion/tipo-direccion-detail.component';
import { TipoDireccion } from 'app/shared/model/tipo-direccion.model';

describe('Component Tests', () => {
  describe('TipoDireccion Management Detail Component', () => {
    let comp: TipoDireccionDetailComponent;
    let fixture: ComponentFixture<TipoDireccionDetailComponent>;
    const route = ({ data: of({ tipoDireccion: new TipoDireccion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [TipoDireccionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TipoDireccionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoDireccionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoDireccion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoDireccion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
