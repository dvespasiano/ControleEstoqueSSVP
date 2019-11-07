import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITbMovimentacao } from 'app/shared/model/tb-movimentacao.model';

type EntityResponseType = HttpResponse<ITbMovimentacao>;
type EntityArrayResponseType = HttpResponse<ITbMovimentacao[]>;

@Injectable({ providedIn: 'root' })
export class TbMovimentacaoService {
  public resourceUrl = SERVER_API_URL + 'api/tb-movimentacaos';

  constructor(protected http: HttpClient) {}

  create(tbMovimentacao: ITbMovimentacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tbMovimentacao);
    return this.http
      .post<ITbMovimentacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tbMovimentacao: ITbMovimentacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tbMovimentacao);
    return this.http
      .put<ITbMovimentacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITbMovimentacao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITbMovimentacao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tbMovimentacao: ITbMovimentacao): ITbMovimentacao {
    const copy: ITbMovimentacao = Object.assign({}, tbMovimentacao, {
      data: tbMovimentacao.data != null && tbMovimentacao.data.isValid() ? tbMovimentacao.data.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data != null ? moment(res.body.data) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tbMovimentacao: ITbMovimentacao) => {
        tbMovimentacao.data = tbMovimentacao.data != null ? moment(tbMovimentacao.data) : null;
      });
    }
    return res;
  }
}
