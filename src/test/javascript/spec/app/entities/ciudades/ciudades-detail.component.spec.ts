import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { CiudadesDetailComponent } from 'app/entities/ciudades/ciudades-detail.component';
import { Ciudades } from 'app/shared/model/ciudades.model';

describe('Component Tests', () => {
  describe('Ciudades Management Detail Component', () => {
    let comp: CiudadesDetailComponent;
    let fixture: ComponentFixture<CiudadesDetailComponent>;
    const route = ({ data: of({ ciudades: new Ciudades(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [CiudadesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CiudadesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CiudadesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ciudades on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ciudades).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
