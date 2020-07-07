import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { ContactoEmpresasDetailComponent } from 'app/entities/contacto-empresas/contacto-empresas-detail.component';
import { ContactoEmpresas } from 'app/shared/model/contacto-empresas.model';

describe('Component Tests', () => {
  describe('ContactoEmpresas Management Detail Component', () => {
    let comp: ContactoEmpresasDetailComponent;
    let fixture: ComponentFixture<ContactoEmpresasDetailComponent>;
    const route = ({ data: of({ contactoEmpresas: new ContactoEmpresas(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [ContactoEmpresasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ContactoEmpresasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactoEmpresasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contactoEmpresas on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contactoEmpresas).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
