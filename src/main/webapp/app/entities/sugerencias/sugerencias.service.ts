import { ISugerencias } from '../../shared/model/sugerencias.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/util/request-util';

type EntityResponseType = HttpResponse<ISugerencias>;
type EntityArrayResponseType = HttpResponse<ISugerencias[]>;

@Injectable({ providedIn: 'root' })
export class SugerenciasService {
  public resourceUrl = SERVER_API_URL + 'api/sugerencias';

  constructor(protected http: HttpClient) {}

  create(puestos: ISugerencias): Observable<EntityResponseType> {
    return this.http.post<ISugerencias>(this.resourceUrl, puestos, { observe: 'response' });
  }

  update(puestos: ISugerencias): Observable<EntityResponseType> {
    return this.http.put<ISugerencias>(this.resourceUrl, puestos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISugerencias>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISugerencias[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
