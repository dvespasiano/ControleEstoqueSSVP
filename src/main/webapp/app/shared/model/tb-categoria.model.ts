export interface ITbCategoria {
  id?: number;
  nmCategoria?: string;
}

export class TbCategoria implements ITbCategoria {
  constructor(public id?: number, public nmCategoria?: string) {}
}
