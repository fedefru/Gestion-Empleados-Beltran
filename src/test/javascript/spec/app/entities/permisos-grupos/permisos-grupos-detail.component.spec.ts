import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { PermisosGruposDetailComponent } from 'app/entities/permisos-grupos/permisos-grupos-detail.component';
import { PermisosGrupos } from 'app/shared/model/permisos-grupos.model';

describe('Component Tests', () => {
  describe('PermisosGrupos Management Detail Component', () => {
    let comp: PermisosGruposDetailComponent;
    let fixture: ComponentFixture<PermisosGruposDetailComponent>;
    const route = ({ data: of({ permisosGrupos: new PermisosGrupos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [PermisosGruposDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PermisosGruposDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PermisosGruposDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load permisosGrupos on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.permisosGrupos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
