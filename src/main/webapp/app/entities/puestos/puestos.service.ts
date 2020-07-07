import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPuestos } from 'app/shared/model/puestos.model';

type EntityResponseType = HttpResponse<IPuestos>;
type EntityArrayResponseType = HttpResponse<IPuestos[]>;

@Injectable({ providedIn: 'root' })
export class PuestosService {
  public resourceUrl = SERVER_API_URL + 'api/puestos';

  constructor(protected http: HttpClient) {}

  create(puestos: IPuestos): Observable<EntityResponseType> {
    return this.http.post<IPuestos>(this.resourceUrl, puestos, { observe: 'response' });
  }

  update(puestos: IPuestos): Observable<EntityResponseType> {
    return this.http.put<IPuestos>(this.resourceUrl, puestos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPuestos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPuestos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
