import { Moment } from 'moment';
import { ITbProduto, TbProduto } from 'app/shared/model/tb-produto.model';

export interface ITbMovimentacao {
  id?: number; 
  saldoAnt?: number;
  quantidade?: number;
  data?: Moment;
  entrada?: number;
  produto?: ITbProduto;
}

export class TbMovimentacao implements ITbMovimentacao {
  constructor(
    public id?: number,    
    public saldoAnt?: number,
    public quantidade?: number,
    public data?: Moment,
    public entrada?: number,
    public produto?: ITbProduto  
  ) {}

}
