import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEmpleados } from 'app/shared/model/empleados.model';

type EntityResponseType = HttpResponse<IEmpleados>;
type EntityArrayResponseType = HttpResponse<IEmpleados[]>;

@Injectable({ providedIn: 'root' })
export class EmpleadosService {
  public resourceUrl = SERVER_API_URL + 'api/empleados';

  constructor(protected http: HttpClient) {}

  create(empleados: IEmpleados): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(empleados);
    return this.http
      .post<IEmpleados>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(empleados: IEmpleados): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(empleados);
    return this.http
      .put<IEmpleados>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEmpleados>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEmpleados[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(empleados: IEmpleados): IEmpleados {
    const copy: IEmpleados = Object.assign({}, empleados, {
      fechaIngreso: empleados.fechaIngreso && empleados.fechaIngreso.isValid() ? empleados.fechaIngreso.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaIngreso = res.body.fechaIngreso ? moment(res.body.fechaIngreso) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((empleados: IEmpleados) => {
        empleados.fechaIngreso = empleados.fechaIngreso ? moment(empleados.fechaIngreso) : undefined;
      });
    }
    return res;
  }
}
