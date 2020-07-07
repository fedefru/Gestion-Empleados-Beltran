import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPermisos } from 'app/shared/model/permisos.model';

type EntityResponseType = HttpResponse<IPermisos>;
type EntityArrayResponseType = HttpResponse<IPermisos[]>;

@Injectable({ providedIn: 'root' })
export class PermisosService {
  public resourceUrl = SERVER_API_URL + 'api/permisos';

  constructor(protected http: HttpClient) {}

  create(permisos: IPermisos): Observable<EntityResponseType> {
    return this.http.post<IPermisos>(this.resourceUrl, permisos, { observe: 'response' });
  }

  update(permisos: IPermisos): Observable<EntityResponseType> {
    return this.http.put<IPermisos>(this.resourceUrl, permisos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPermisos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPermisos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
