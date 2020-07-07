import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEntidadesEmpresas } from 'app/shared/model/entidades-empresas.model';

type EntityResponseType = HttpResponse<IEntidadesEmpresas>;
type EntityArrayResponseType = HttpResponse<IEntidadesEmpresas[]>;

@Injectable({ providedIn: 'root' })
export class EntidadesEmpresasService {
  public resourceUrl = SERVER_API_URL + 'api/entidades-empresas';

  constructor(protected http: HttpClient) {}

  create(entidadesEmpresas: IEntidadesEmpresas): Observable<EntityResponseType> {
    return this.http.post<IEntidadesEmpresas>(this.resourceUrl, entidadesEmpresas, { observe: 'response' });
  }

  update(entidadesEmpresas: IEntidadesEmpresas): Observable<EntityResponseType> {
    return this.http.put<IEntidadesEmpresas>(this.resourceUrl, entidadesEmpresas, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEntidadesEmpresas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntidadesEmpresas[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
