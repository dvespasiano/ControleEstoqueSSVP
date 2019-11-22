import { ITbProduto } from 'app/shared/model/tb-produto.model';

export interface ITbUnidadeMedida {
  id?: number;
  nmUnidadeMedida?: string;
}

export class TbUnidadeMedida implements ITbUnidadeMedida {
  constructor(public id?: number, public nmUnidadeMedida?: string) {}
}
