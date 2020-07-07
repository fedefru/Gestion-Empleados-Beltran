import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAreas } from 'app/shared/model/areas.model';

type EntityResponseType = HttpResponse<IAreas>;
type EntityArrayResponseType = HttpResponse<IAreas[]>;

@Injectable({ providedIn: 'root' })
export class AreasService {
  public resourceUrl = SERVER_API_URL + 'api/areas';

  constructor(protected http: HttpClient) {}

  create(areas: IAreas): Observable<EntityResponseType> {
    return this.http.post<IAreas>(this.resourceUrl, areas, { observe: 'response' });
  }

  update(areas: IAreas): Observable<EntityResponseType> {
    return this.http.put<IAreas>(this.resourceUrl, areas, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAreas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAreas[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
