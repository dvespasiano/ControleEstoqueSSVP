import { ITbMovimentacao } from 'app/shared/model/tb-movimentacao.model';
import { ITbUnidadeMedida } from './tb-unidade-medida.model';
import { ITbCategoria } from './tb-categoria.model';

export interface ITbProduto {
  id?: number;
  nmProduto?: string;
  qtdEstoque?: number;
  qtdMin?: number;
  ativo?: number;
  situacao?: number;
  idUnidadeMedida?: number;
  idCategoria?: number;
  tbUnidadeMedida?: ITbUnidadeMedida;
  tbCategoria?: ITbCategoria;
}

export class TbProduto implements ITbProduto {
  constructor(
    public id?: number,
    public nmProduto?: string,
    public qtdEstoque?: number,
    public qtdMin?: number,
    public ativo?: number,
    public situacao?: number,
    public idUnidadeMedida?: number,
    public idCategoria?: number,
    public tbUnidadeMedida?: ITbUnidadeMedida,
    public tbCategoria?: ITbCategoria,
  ) { }
}
