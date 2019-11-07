import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITbCategoria } from 'app/shared/model/tb-categoria.model';

type EntityResponseType = HttpResponse<ITbCategoria>;
type EntityArrayResponseType = HttpResponse<ITbCategoria[]>;

@Injectable({ providedIn: 'root' })
export class TbCategoriaService {
  public resourceUrl = SERVER_API_URL + 'api/tb-categorias';

  constructor(protected http: HttpClient) {}

  create(tbCategoria: ITbCategoria): Observable<EntityResponseType> {
    return this.http.post<ITbCategoria>(this.resourceUrl, tbCategoria, { observe: 'response' });
  }

  update(tbCategoria: ITbCategoria): Observable<EntityResponseType> {
    return this.http.put<ITbCategoria>(this.resourceUrl, tbCategoria, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITbCategoria>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITbCategoria[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
