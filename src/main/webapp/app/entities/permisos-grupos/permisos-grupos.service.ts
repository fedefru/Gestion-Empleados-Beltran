import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPermisosGrupos } from 'app/shared/model/permisos-grupos.model';

type EntityResponseType = HttpResponse<IPermisosGrupos>;
type EntityArrayResponseType = HttpResponse<IPermisosGrupos[]>;

@Injectable({ providedIn: 'root' })
export class PermisosGruposService {
  public resourceUrl = SERVER_API_URL + 'api/permisos-grupos';

  constructor(protected http: HttpClient) {}

  create(permisosGrupos: IPermisosGrupos): Observable<EntityResponseType> {
    return this.http.post<IPermisosGrupos>(this.resourceUrl, permisosGrupos, { observe: 'response' });
  }

  update(permisosGrupos: IPermisosGrupos): Observable<EntityResponseType> {
    return this.http.put<IPermisosGrupos>(this.resourceUrl, permisosGrupos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPermisosGrupos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPermisosGrupos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
