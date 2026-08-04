export class Veiculo {
  private _id: string;
  private _placa: string;
  private _modelo: string;
  private _marca: string;
  private _ano: number;
  private _clienteId: string;
  private _foto: string;

  constructor(id: string, placa: string, modelo: string, marca: string, ano: number, clienteId: string, foto: string) {
      this._id = id;
      this._placa = placa;
      this._modelo = modelo;
      this._marca = marca;
      this._ano = ano;
      this._clienteId = clienteId;
      this._foto = foto;
      this.validar();
  }

  public get id(): string {
      return this._id;
  }

  public get placa(): string {
      return this._placa;
  }

  public set placa(value: string) {
      if (!value) {
          throw new Error("Placa é obrigatória.");
      }
      this._placa = value;
  }

  public get modelo(): string {
      return this._modelo;
  }

  public set modelo(value: string) {
      if (!value) {
          throw new Error("Modelo é obrigatório.");
      }
      this._modelo = value;
  }

  public get marca(): string {
      return this._marca;
  }

  public set marca(value: string) {
      if (!value) {
          throw new Error("Marca é obrigatória.");
      }
      this._marca = value;
  }

  public get ano(): number {
      return this._ano;
  }

  public set ano(value: number) {
      if (!value || value <= 0) {
          throw new Error("Ano é obrigatório e deve ser um número positivo.");
      }
      this._ano = value;
  }

  public get clienteId(): string {
      return this._clienteId;
  }

  public set clienteId(value: string) {
      if (!value) {
          throw new Error("ID do cliente é obrigatório.");
      }
      this._clienteId = value;
  }

  public get foto(): string {
      return this._foto;
  }

  public set foto(value: string) {
      // A validação da foto pode ser mais complexa, por enquanto apenas verifica se não é vazia
      if (!value) {
          throw new Error("Foto é obrigatória.");
      }
      this._foto = value;
  }

  public validar(): void {
      if (!this._placa) {
          throw new Error("Placa do veículo é obrigatória.");
      }
      if (!this._modelo) {
          throw new Error("Modelo do veículo é obrigatório.");
      }
      if (!this._marca) {
          throw new Error("Marca do veículo é obrigatória.");
      }
      if (!this._ano || this._ano <= 0) {
          throw new Error("Ano do veículo é obrigatório e deve ser um número positivo.");
      }
      if (!this._clienteId) {
          throw new Error("ID do cliente do veículo é obrigatório.");
      }
      if (!this._foto) {
          throw new Error("Foto do veículo é obrigatória.");
      }
  }

  public toJSON(): any {
      return {
          id: this._id,
          placa: this._placa,
          modelo: this._modelo,
          marca: this._marca,
          ano: this._ano,
          clienteId: this._clienteId,
          foto: this._foto,
      };
  }

  public static fromJSON(json: any): Veiculo {
      if (!json.id || !json.placa || !json.modelo || !json.marca || !json.ano || !json.clienteId || !json.foto) {
          throw new Error("Dados JSON incompletos para Veículo.");
      }
      return new Veiculo(json.id, json.placa, json.modelo, json.marca, json.ano, json.clienteId, json.foto);
  }
}
