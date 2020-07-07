import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoDocumentos } from 'app/shared/model/tipo-documentos.model';

type EntityResponseType = HttpResponse<ITipoDocumentos>;
type EntityArrayResponseType = HttpResponse<ITipoDocumentos[]>;

@Injectable({ providedIn: 'root' })
export class TipoDocumentosService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-documentos';

  constructor(protected http: HttpClient) {}

  create(tipoDocumentos: ITipoDocumentos): Observable<EntityResponseType> {
    return this.http.post<ITipoDocumentos>(this.resourceUrl, tipoDocumentos, { observe: 'response' });
  }

  update(tipoDocumentos: ITipoDocumentos): Observable<EntityResponseType> {
    return this.http.put<ITipoDocumentos>(this.resourceUrl, tipoDocumentos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoDocumentos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoDocumentos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
