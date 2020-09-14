import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUsuarios } from 'app/shared/model/usuarios.model';

type EntityResponseType = HttpResponse<IUsuarios>;
type EntityArrayResponseType = HttpResponse<IUsuarios[]>;

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  public resourceUrl = SERVER_API_URL + 'api/usuarios';

  constructor(protected http: HttpClient) {}

  create(usuarios: IUsuarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usuarios);
    return this.http
      .post<IUsuarios>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(usuarios: IUsuarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usuarios);
    return this.http
      .put<IUsuarios>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUsuarios>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findUsuarioByAlias(user: string): Observable<HttpResponse<any>> {
    return this.http.get<IUsuarios>(`${this.resourceUrl}/alias/${user}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUsuarios[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(usuarios: IUsuarios): IUsuarios {
    const copy: IUsuarios = Object.assign({}, usuarios, {
      fechaNac: usuarios.fechaNac && usuarios.fechaNac.isValid() ? usuarios.fechaNac.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaNac = res.body.fechaNac ? moment(res.body.fechaNac) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((usuarios: IUsuarios) => {
        usuarios.fechaNac = usuarios.fechaNac ? moment(usuarios.fechaNac) : undefined;
      });
    }
    return res;
  }
}
