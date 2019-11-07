import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITbProduto } from 'app/shared/model/tb-produto.model';

type EntityResponseType = HttpResponse<ITbProduto>;
type EntityArrayResponseType = HttpResponse<ITbProduto[]>;

@Injectable({ providedIn: 'root' })
export class TbProdutoService {
  public resourceUrl = SERVER_API_URL + 'api/tb-produtos';

  constructor(protected http: HttpClient) {}

  create(tbProduto: ITbProduto): Observable<EntityResponseType> {
    return this.http.post<ITbProduto>(this.resourceUrl, tbProduto, { observe: 'response' });
  }

  update(tbProduto: ITbProduto): Observable<EntityResponseType> {
    return this.http.put<ITbProduto>(this.resourceUrl, tbProduto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITbProduto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITbProduto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
