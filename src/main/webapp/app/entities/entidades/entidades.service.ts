import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEntidades } from 'app/shared/model/entidades.model';

type EntityResponseType = HttpResponse<IEntidades>;
type EntityArrayResponseType = HttpResponse<IEntidades[]>;

@Injectable({ providedIn: 'root' })
export class EntidadesService {
  public resourceUrl = SERVER_API_URL + 'api/entidades';

  constructor(protected http: HttpClient) {}

  create(entidades: IEntidades): Observable<EntityResponseType> {
    return this.http.post<IEntidades>(this.resourceUrl, entidades, { observe: 'response' });
  }

  update(entidades: IEntidades): Observable<EntityResponseType> {
    return this.http.put<IEntidades>(this.resourceUrl, entidades, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEntidades>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntidades[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
