import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { EmpresasDetailComponent } from 'app/entities/empresas/empresas-detail.component';
import { Empresas } from 'app/shared/model/empresas.model';

describe('Component Tests', () => {
  describe('Empresas Management Detail Component', () => {
    let comp: EmpresasDetailComponent;
    let fixture: ComponentFixture<EmpresasDetailComponent>;
    const route = ({ data: of({ empresas: new Empresas(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EmpresasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EmpresasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmpresasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load empresas on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.empresas).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
