import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { ProvinciasDetailComponent } from 'app/entities/provincias/provincias-detail.component';
import { Provincias } from 'app/shared/model/provincias.model';

describe('Component Tests', () => {
  describe('Provincias Management Detail Component', () => {
    let comp: ProvinciasDetailComponent;
    let fixture: ComponentFixture<ProvinciasDetailComponent>;
    const route = ({ data: of({ provincias: new Provincias(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [ProvinciasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProvinciasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProvinciasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load provincias on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.provincias).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
