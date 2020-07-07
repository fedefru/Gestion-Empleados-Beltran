import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoContactos } from 'app/shared/model/tipo-contactos.model';

type EntityResponseType = HttpResponse<ITipoContactos>;
type EntityArrayResponseType = HttpResponse<ITipoContactos[]>;

@Injectable({ providedIn: 'root' })
export class TipoContactosService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-contactos';

  constructor(protected http: HttpClient) {}

  create(tipoContactos: ITipoContactos): Observable<EntityResponseType> {
    return this.http.post<ITipoContactos>(this.resourceUrl, tipoContactos, { observe: 'response' });
  }

  update(tipoContactos: ITipoContactos): Observable<EntityResponseType> {
    return this.http.put<ITipoContactos>(this.resourceUrl, tipoContactos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoContactos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoContactos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
