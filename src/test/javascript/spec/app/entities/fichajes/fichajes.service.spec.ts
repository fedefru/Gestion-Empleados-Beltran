import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { FichajesService } from 'app/entities/fichajes/fichajes.service';
import { IFichajes, Fichajes } from 'app/shared/model/fichajes.model';

describe('Service Tests', () => {
  describe('Fichajes Service', () => {
    let injector: TestBed;
    let service: FichajesService;
    let httpMock: HttpTestingController;
    let elemDefault: IFichajes;
    let expectedResult: IFichajes | IFichajes[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(FichajesService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Fichajes(0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fichaje: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Fichajes', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fichaje: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fichaje: currentDate,
          },
          returnedFromService
        );

        service.create(new Fichajes()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Fichajes', () => {
        const returnedFromService = Object.assign(
          {
            fichaje: currentDate.format(DATE_FORMAT),
            accion: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fichaje: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Fichajes', () => {
        const returnedFromService = Object.assign(
          {
            fichaje: currentDate.format(DATE_FORMAT),
            accion: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fichaje: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Fichajes', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
