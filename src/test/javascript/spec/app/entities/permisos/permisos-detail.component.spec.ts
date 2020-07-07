import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { PermisosDetailComponent } from 'app/entities/permisos/permisos-detail.component';
import { Permisos } from 'app/shared/model/permisos.model';

describe('Component Tests', () => {
  describe('Permisos Management Detail Component', () => {
    let comp: PermisosDetailComponent;
    let fixture: ComponentFixture<PermisosDetailComponent>;
    const route = ({ data: of({ permisos: new Permisos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [PermisosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PermisosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PermisosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load permisos on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.permisos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
