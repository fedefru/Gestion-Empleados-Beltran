import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../../app/app.constants';
import { IEmpresaDto } from 'app/shared/model/empresa-dto.model';

type EntityResponseType = HttpResponse<IEmpresaDto>;

@Injectable({ providedIn: 'root' })
export class RegistroService {
  resourceUrl: string = SERVER_API_URL + 'api/empresas/registro';

  constructor(private http: HttpClient) {}

  create(empresa: IEmpresaDto): Observable<EntityResponseType> {
    return this.http.post<IEmpresaDto>(this.resourceUrl, empresa, { observe: 'response' });
  }
}
