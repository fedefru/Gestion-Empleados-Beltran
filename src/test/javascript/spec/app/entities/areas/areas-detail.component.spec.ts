import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { AreasDetailComponent } from 'app/entities/areas/areas-detail.component';
import { Areas } from 'app/shared/model/areas.model';

describe('Component Tests', () => {
  describe('Areas Management Detail Component', () => {
    let comp: AreasDetailComponent;
    let fixture: ComponentFixture<AreasDetailComponent>;
    const route = ({ data: of({ areas: new Areas(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [AreasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AreasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AreasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load areas on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.areas).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
