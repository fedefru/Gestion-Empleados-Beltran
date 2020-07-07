import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { EntidadesEmpresasDetailComponent } from 'app/entities/entidades-empresas/entidades-empresas-detail.component';
import { EntidadesEmpresas } from 'app/shared/model/entidades-empresas.model';

describe('Component Tests', () => {
  describe('EntidadesEmpresas Management Detail Component', () => {
    let comp: EntidadesEmpresasDetailComponent;
    let fixture: ComponentFixture<EntidadesEmpresasDetailComponent>;
    const route = ({ data: of({ entidadesEmpresas: new EntidadesEmpresas(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EntidadesEmpresasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EntidadesEmpresasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntidadesEmpresasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load entidadesEmpresas on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.entidadesEmpresas).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
