import { ITbProduto } from 'app/shared/model/tb-produto.model';

export interface ITbCategoria {
  id?: number;
  idTbCategoria?: number;
  nmCategoria?: string;
  idCategoria?: ITbProduto;
}

export class TbCategoria implements ITbCategoria {
  constructor(public id?: number, public idTbCategoria?: number, public nmCategoria?: string, public idCategoria?: ITbProduto) {}
}
