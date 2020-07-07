import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { PaisesDetailComponent } from 'app/entities/paises/paises-detail.component';
import { Paises } from 'app/shared/model/paises.model';

describe('Component Tests', () => {
  describe('Paises Management Detail Component', () => {
    let comp: PaisesDetailComponent;
    let fixture: ComponentFixture<PaisesDetailComponent>;
    const route = ({ data: of({ paises: new Paises(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [PaisesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PaisesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaisesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load paises on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paises).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
