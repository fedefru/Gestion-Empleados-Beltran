import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContactoEmpresas } from 'app/shared/model/contacto-empresas.model';

type EntityResponseType = HttpResponse<IContactoEmpresas>;
type EntityArrayResponseType = HttpResponse<IContactoEmpresas[]>;

@Injectable({ providedIn: 'root' })
export class ContactoEmpresasService {
  public resourceUrl = SERVER_API_URL + 'api/contacto-empresas';

  constructor(protected http: HttpClient) {}

  create(contactoEmpresas: IContactoEmpresas): Observable<EntityResponseType> {
    return this.http.post<IContactoEmpresas>(this.resourceUrl, contactoEmpresas, { observe: 'response' });
  }

  update(contactoEmpresas: IContactoEmpresas): Observable<EntityResponseType> {
    return this.http.put<IContactoEmpresas>(this.resourceUrl, contactoEmpresas, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContactoEmpresas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContactoEmpresas[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
