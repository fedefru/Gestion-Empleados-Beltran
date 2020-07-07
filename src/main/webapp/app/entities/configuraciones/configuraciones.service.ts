import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConfiguraciones } from 'app/shared/model/configuraciones.model';

type EntityResponseType = HttpResponse<IConfiguraciones>;
type EntityArrayResponseType = HttpResponse<IConfiguraciones[]>;

@Injectable({ providedIn: 'root' })
export class ConfiguracionesService {
  public resourceUrl = SERVER_API_URL + 'api/configuraciones';

  constructor(protected http: HttpClient) {}

  create(configuraciones: IConfiguraciones): Observable<EntityResponseType> {
    return this.http.post<IConfiguraciones>(this.resourceUrl, configuraciones, { observe: 'response' });
  }

  update(configuraciones: IConfiguraciones): Observable<EntityResponseType> {
    return this.http.put<IConfiguraciones>(this.resourceUrl, configuraciones, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConfiguraciones>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConfiguraciones[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
