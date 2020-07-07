import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { EntidadesDetailComponent } from 'app/entities/entidades/entidades-detail.component';
import { Entidades } from 'app/shared/model/entidades.model';

describe('Component Tests', () => {
  describe('Entidades Management Detail Component', () => {
    let comp: EntidadesDetailComponent;
    let fixture: ComponentFixture<EntidadesDetailComponent>;
    const route = ({ data: of({ entidades: new Entidades(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EntidadesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EntidadesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntidadesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load entidades on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.entidades).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
