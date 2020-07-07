import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { FichajesDetailComponent } from 'app/entities/fichajes/fichajes-detail.component';
import { Fichajes } from 'app/shared/model/fichajes.model';

describe('Component Tests', () => {
  describe('Fichajes Management Detail Component', () => {
    let comp: FichajesDetailComponent;
    let fixture: ComponentFixture<FichajesDetailComponent>;
    const route = ({ data: of({ fichajes: new Fichajes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [FichajesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FichajesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FichajesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load fichajes on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fichajes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
