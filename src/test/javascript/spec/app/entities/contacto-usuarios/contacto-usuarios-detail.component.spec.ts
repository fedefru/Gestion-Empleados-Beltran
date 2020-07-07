import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { ContactoUsuariosDetailComponent } from 'app/entities/contacto-usuarios/contacto-usuarios-detail.component';
import { ContactoUsuarios } from 'app/shared/model/contacto-usuarios.model';

describe('Component Tests', () => {
  describe('ContactoUsuarios Management Detail Component', () => {
    let comp: ContactoUsuariosDetailComponent;
    let fixture: ComponentFixture<ContactoUsuariosDetailComponent>;
    const route = ({ data: of({ contactoUsuarios: new ContactoUsuarios(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [ContactoUsuariosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ContactoUsuariosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactoUsuariosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contactoUsuarios on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contactoUsuarios).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
