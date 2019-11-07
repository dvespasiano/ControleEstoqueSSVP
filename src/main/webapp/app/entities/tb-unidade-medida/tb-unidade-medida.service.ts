import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITbUnidadeMedida } from 'app/shared/model/tb-unidade-medida.model';

type EntityResponseType = HttpResponse<ITbUnidadeMedida>;
type EntityArrayResponseType = HttpResponse<ITbUnidadeMedida[]>;

@Injectable({ providedIn: 'root' })
export class TbUnidadeMedidaService {
  public resourceUrl = SERVER_API_URL + 'api/tb-unidade-medidas';

  constructor(protected http: HttpClient) {}

  create(tbUnidadeMedida: ITbUnidadeMedida): Observable<EntityResponseType> {
    return this.http.post<ITbUnidadeMedida>(this.resourceUrl, tbUnidadeMedida, { observe: 'response' });
  }

  update(tbUnidadeMedida: ITbUnidadeMedida): Observable<EntityResponseType> {
    return this.http.put<ITbUnidadeMedida>(this.resourceUrl, tbUnidadeMedida, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITbUnidadeMedida>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITbUnidadeMedida[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
