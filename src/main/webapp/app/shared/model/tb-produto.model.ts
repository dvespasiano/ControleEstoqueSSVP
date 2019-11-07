import { ITbMovimentacao } from 'app/shared/model/tb-movimentacao.model';

export interface ITbProduto {
  id?: number;
  idTbProduto?: number;
  nmProduto?: string;
  qtdEstoque?: string;
  qtdMin?: string;
  ativo?: number;
  tbmovimentacaos?: ITbMovimentacao[];
}

export class TbProduto implements ITbProduto {
  constructor(
    public id?: number,
    public idTbProduto?: number,
    public nmProduto?: string,
    public qtdEstoque?: string,
    public qtdMin?: string,
    public ativo?: number,
    public tbmovimentacaos?: ITbMovimentacao[]
  ) {}
}
