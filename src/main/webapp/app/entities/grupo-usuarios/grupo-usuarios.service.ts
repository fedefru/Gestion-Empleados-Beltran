import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGrupoUsuarios } from 'app/shared/model/grupo-usuarios.model';

type EntityResponseType = HttpResponse<IGrupoUsuarios>;
type EntityArrayResponseType = HttpResponse<IGrupoUsuarios[]>;

@Injectable({ providedIn: 'root' })
export class GrupoUsuariosService {
  public resourceUrl = SERVER_API_URL + 'api/grupo-usuarios';

  constructor(protected http: HttpClient) {}

  create(grupoUsuarios: IGrupoUsuarios): Observable<EntityResponseType> {
    return this.http.post<IGrupoUsuarios>(this.resourceUrl, grupoUsuarios, { observe: 'response' });
  }

  update(grupoUsuarios: IGrupoUsuarios): Observable<EntityResponseType> {
    return this.http.put<IGrupoUsuarios>(this.resourceUrl, grupoUsuarios, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGrupoUsuarios>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGrupoUsuarios[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
