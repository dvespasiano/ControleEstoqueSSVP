import { ITbMovimentacao } from 'app/shared/model/tb-movimentacao.model';

export interface ITbProduto {
  id?: number;
  nmProduto?: string;
  qtdEstoque?: number;
  qtdMin?: number;
  ativo?: number;
  situacao?: number;
  tbmovimentacaos?: ITbMovimentacao[];
}

export class TbProduto implements ITbProduto {
  constructor(
    public id?: number,
    public nmProduto?: string,
    public qtdEstoque?: number,
    public qtdMin?: number,
    public ativo?: number,
    public situacao?: number,
    public tbmovimentacaos?: ITbMovimentacao[]
  ) {}
}
