import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { ConfiguracionesDetailComponent } from 'app/entities/configuraciones/configuraciones-detail.component';
import { Configuraciones } from 'app/shared/model/configuraciones.model';

describe('Component Tests', () => {
  describe('Configuraciones Management Detail Component', () => {
    let comp: ConfiguracionesDetailComponent;
    let fixture: ComponentFixture<ConfiguracionesDetailComponent>;
    const route = ({ data: of({ configuraciones: new Configuraciones(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [ConfiguracionesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ConfiguracionesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConfiguracionesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load configuraciones on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.configuraciones).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
