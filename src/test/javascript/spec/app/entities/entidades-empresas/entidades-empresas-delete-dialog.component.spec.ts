import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEmpleadosTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { EntidadesEmpresasDeleteDialogComponent } from 'app/entities/entidades-empresas/entidades-empresas-delete-dialog.component';
import { EntidadesEmpresasService } from 'app/entities/entidades-empresas/entidades-empresas.service';

describe('Component Tests', () => {
  describe('EntidadesEmpresas Management Delete Component', () => {
    let comp: EntidadesEmpresasDeleteDialogComponent;
    let fixture: ComponentFixture<EntidadesEmpresasDeleteDialogComponent>;
    let service: EntidadesEmpresasService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionEmpleadosTestModule],
        declarations: [EntidadesEmpresasDeleteDialogComponent],
      })
        .overrideTemplate(EntidadesEmpresasDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntidadesEmpresasDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntidadesEmpresasService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
