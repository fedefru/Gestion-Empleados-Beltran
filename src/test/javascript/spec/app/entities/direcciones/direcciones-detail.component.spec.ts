import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { DireccionesDetailComponent } from 'app/entities/direcciones/direcciones-detail.component';
import { Direcciones } from 'app/shared/model/direcciones.model';

describe('Component Tests', () => {
  describe('Direcciones Management Detail Component', () => {
    let comp: DireccionesDetailComponent;
    let fixture: ComponentFixture<DireccionesDetailComponent>;
    const route = ({ data: of({ direcciones: new Direcciones(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [DireccionesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DireccionesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DireccionesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load direcciones on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.direcciones).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
