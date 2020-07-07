import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEntidadesUsuarios } from 'app/shared/model/entidades-usuarios.model';

type EntityResponseType = HttpResponse<IEntidadesUsuarios>;
type EntityArrayResponseType = HttpResponse<IEntidadesUsuarios[]>;

@Injectable({ providedIn: 'root' })
export class EntidadesUsuariosService {
  public resourceUrl = SERVER_API_URL + 'api/entidades-usuarios';

  constructor(protected http: HttpClient) {}

  create(entidadesUsuarios: IEntidadesUsuarios): Observable<EntityResponseType> {
    return this.http.post<IEntidadesUsuarios>(this.resourceUrl, entidadesUsuarios, { observe: 'response' });
  }

  update(entidadesUsuarios: IEntidadesUsuarios): Observable<EntityResponseType> {
    return this.http.put<IEntidadesUsuarios>(this.resourceUrl, entidadesUsuarios, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEntidadesUsuarios>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntidadesUsuarios[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
