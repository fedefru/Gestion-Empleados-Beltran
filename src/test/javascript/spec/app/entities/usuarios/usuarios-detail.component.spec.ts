import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { UsuariosDetailComponent } from 'app/entities/usuarios/usuarios-detail.component';
import { Usuarios } from 'app/shared/model/usuarios.model';

describe('Component Tests', () => {
  describe('Usuarios Management Detail Component', () => {
    let comp: UsuariosDetailComponent;
    let fixture: ComponentFixture<UsuariosDetailComponent>;
    const route = ({ data: of({ usuarios: new Usuarios(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [UsuariosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UsuariosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UsuariosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load usuarios on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.usuarios).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
