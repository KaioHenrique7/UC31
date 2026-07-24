export class Veiculos {
    constructor(
      public id: string,
      public placa: string,
      public modelo: string,
      public marca: string,
      public ano: number,
      public clienteId: string,
      public foto: string
    ) {}
  }