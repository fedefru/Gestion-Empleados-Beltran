import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { GrupoUsuariosDetailComponent } from 'app/entities/grupo-usuarios/grupo-usuarios-detail.component';
import { GrupoUsuarios } from 'app/shared/model/grupo-usuarios.model';

describe('Component Tests', () => {
  describe('GrupoUsuarios Management Detail Component', () => {
    let comp: GrupoUsuariosDetailComponent;
    let fixture: ComponentFixture<GrupoUsuariosDetailComponent>;
    const route = ({ data: of({ grupoUsuarios: new GrupoUsuarios(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [GrupoUsuariosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GrupoUsuariosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GrupoUsuariosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load grupoUsuarios on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.grupoUsuarios).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
