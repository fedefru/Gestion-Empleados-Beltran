/* eslint-disable no-console */

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFichajes } from 'app/shared/model/fichajes.model';

type EntityResponseType = HttpResponse<IFichajes>;
type EntityArrayResponseType = HttpResponse<IFichajes[]>;

@Injectable({ providedIn: 'root' })
export class FichajesService {
  public resourceUrl = SERVER_API_URL + 'api/fichajes';
  public urlFichaje = 'http://127.0.0.1:5000/reconocimiento';

  constructor(protected http: HttpClient) {}

  create(fichajes: IFichajes): Observable<EntityResponseType> {
    const copy = fichajes;
    console.log('entre, fichaje -> ' + fichajes);
    return this.http.post<IFichajes>(this.resourceUrl, copy, { observe: 'response' });
  }

  update(fichajes: IFichajes): Observable<EntityResponseType> {
    const copy = fichajes;
    return this.http.put<IFichajes>(this.resourceUrl, copy, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFichajes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFichajes[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  reconocerRostro(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.urlFichaje}`, { observe: 'response' });
  }

  protected convertDateFromClient(fichajes: IFichajes): IFichajes {
    const copy: IFichajes = Object.assign({}, fichajes, {
      fichaje: fichajes.fichaje && fichajes.fichaje.isValid() ? fichajes.fichaje.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fichaje = res.body.fichaje ? moment(res.body.fichaje) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((fichajes: IFichajes) => {
        fichajes.fichaje = fichajes.fichaje ? moment(fichajes.fichaje) : undefined;
      });
    }
    return res;
  }
}

/* eslint-enable no-console */
