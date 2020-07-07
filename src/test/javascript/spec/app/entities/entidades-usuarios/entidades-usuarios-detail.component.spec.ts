import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { EntidadesUsuariosDetailComponent } from 'app/entities/entidades-usuarios/entidades-usuarios-detail.component';
import { EntidadesUsuarios } from 'app/shared/model/entidades-usuarios.model';

describe('Component Tests', () => {
  describe('EntidadesUsuarios Management Detail Component', () => {
    let comp: EntidadesUsuariosDetailComponent;
    let fixture: ComponentFixture<EntidadesUsuariosDetailComponent>;
    const route = ({ data: of({ entidadesUsuarios: new EntidadesUsuarios(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EntidadesUsuariosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EntidadesUsuariosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntidadesUsuariosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load entidadesUsuarios on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.entidadesUsuarios).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
