/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFichajes } from 'app/shared/model/fichajes.model';

type EntityResponseType = HttpResponse<IFichajes>;
type EntityArrayResponseType = HttpResponse<IFichajes[]>;

@Injectable({ providedIn: 'root' })
export class ImagenesFichajeService {
  public resourceUrl = SERVER_API_URL + 'api/fichajes';
  public resourceUrlRuta = SERVER_API_URL + 'api/fichajes/rutaimagen/';
  public urlFichaje = 'http://127.0.0.1:5000/reconocimiento';

  constructor(protected http: HttpClient) {}

  create(fichajes: IFichajes): Observable<EntityResponseType> {
    const copy = fichajes;
    console.log('entre, fichaje -> ' + copy);
    return this.http.post<IFichajes>(this.resourceUrl, copy, { observe: 'response' });
  }

  update(fichajes: IFichajes): Observable<EntityResponseType> {
    const copy = fichajes;
    return this.http.put<IFichajes>(this.resourceUrl, copy, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFichajes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFichajes[]>(this.resourceUrl, { params: options, observe: 'response' })
  }

  queryImagenes(search: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(search);
    return this.http
      .get<[]>(this.resourceUrlRuta + search, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  reconocerRostro(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.urlFichaje}`, { observe: 'response' });
  }


}
/* eslint-enable no-console */
