import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { PuestosDetailComponent } from 'app/entities/puestos/puestos-detail.component';
import { Puestos } from 'app/shared/model/puestos.model';

describe('Component Tests', () => {
  describe('Puestos Management Detail Component', () => {
    let comp: PuestosDetailComponent;
    let fixture: ComponentFixture<PuestosDetailComponent>;
    const route = ({ data: of({ puestos: new Puestos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [PuestosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PuestosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PuestosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load puestos on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.puestos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
