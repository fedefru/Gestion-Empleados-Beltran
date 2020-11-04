import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProvincias } from 'app/shared/model/provincias.model';

type EntityResponseType = HttpResponse<IProvincias>;
type EntityArrayResponseType = HttpResponse<IProvincias[]>;

@Injectable({ providedIn: 'root' })
export class ProvinciasService {
  public resourceUrl = SERVER_API_URL + 'api/provincias';
  public resourceUrlProvincias = SERVER_API_URL + 'api/getByCountry';

  constructor(protected http: HttpClient) {}

  create(provincias: IProvincias): Observable<EntityResponseType> {
    return this.http.post<IProvincias>(this.resourceUrl, provincias, { observe: 'response' });
  }

  update(provincias: IProvincias): Observable<EntityResponseType> {
    return this.http.put<IProvincias>(this.resourceUrl, provincias, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProvincias>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProvincias[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getByCountry(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IProvincias[]>(`${this.resourceUrlProvincias}/${id}`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
