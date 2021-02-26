import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICiudades } from 'app/shared/model/ciudades.model';

type EntityResponseType = HttpResponse<ICiudades>;
type EntityArrayResponseType = HttpResponse<ICiudades[]>;

@Injectable({ providedIn: 'root' })
export class CiudadesService {
  public resourceUrl = SERVER_API_URL + 'api/ciudades';
  public resourceUrlCiudades = SERVER_API_URL + 'api/getByState';
  public resourceUrlNombre = SERVER_API_URL + 'api/ciudades/nombre';

  constructor(protected http: HttpClient) {}

  create(ciudades: ICiudades): Observable<EntityResponseType> {
    return this.http.post<ICiudades>(this.resourceUrl, ciudades, { observe: 'response' });
  }

  update(ciudades: ICiudades): Observable<EntityResponseType> {
    return this.http.put<ICiudades>(this.resourceUrl, ciudades, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICiudades>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByNombre(nombre: string): Observable<EntityResponseType> {
    return this.http.get<ICiudades>(`${this.resourceUrlNombre}/${nombre}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICiudades[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getByState(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<ICiudades[]>(`${this.resourceUrlCiudades}/${id}`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
