import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoDireccion } from 'app/shared/model/tipo-direccion.model';

type EntityResponseType = HttpResponse<ITipoDireccion>;
type EntityArrayResponseType = HttpResponse<ITipoDireccion[]>;

@Injectable({ providedIn: 'root' })
export class TipoDireccionService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-direccions';

  constructor(protected http: HttpClient) {}

  create(tipoDireccion: ITipoDireccion): Observable<EntityResponseType> {
    return this.http.post<ITipoDireccion>(this.resourceUrl, tipoDireccion, { observe: 'response' });
  }

  update(tipoDireccion: ITipoDireccion): Observable<EntityResponseType> {
    return this.http.put<ITipoDireccion>(this.resourceUrl, tipoDireccion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoDireccion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoDireccion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
