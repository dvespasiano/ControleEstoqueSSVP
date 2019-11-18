import { ITbProduto } from 'app/shared/model/tb-produto.model';

export interface ITbUnidadeMedida {
  id?: number;
  idTbUnidadeMedida?: number;
  nmUnidadeMedida?: string;
}

export class TbUnidadeMedida implements ITbUnidadeMedida {
  constructor(public id?: number, public idTbUnidadeMedida?: number, public nmUnidadeMedida?: string) {}
}
