export class OrdemServico {
  private _id: string;
  private _veiculo: string;
  private _descricao: string;
  private _valor: number;
  private _status: "Aberta" | "Em andamento" | "Finalizada";

  constructor(id: string, veiculo: string, descricao: string, valor: number, status: "Aberta" | "Em andamento" | "Finalizada") {
      this._id = id;
      this._veiculo = veiculo;
      this._descricao = descricao;
      this._valor = valor;
      this._status = status;
      this.validar();
  }

  public get id(): string {
      return this._id;
  }

  public get veiculo(): string {
      return this._veiculo;
  }

  public set veiculo(value: string) {
      if (!value) {
          throw new Error("Veículo é obrigatório.");
      }
      this._veiculo = value;
  }

  public get descricao(): string {
      return this._descricao;
  }

  public set descricao(value: string) {
      if (!value) {
          throw new Error("Descrição é obrigatória.");
      }
      this._descricao = value;
  }

  public get valor(): number {
      return this._valor;
  }

  public set valor(value: number) {
      if (value <= 0) {
          throw new Error("Valor deve ser um número positivo.");
      }
      this._valor = value;
  }

  public get status(): "Aberta" | "Em andamento" | "Finalizada" {
      return this._status;
  }

  public set status(value: "Aberta" | "Em andamento" | "Finalizada") {
      const validStatus = ["Aberta", "Em andamento", "Finalizada"];
      if (!validStatus.includes(value)) {
          throw new Error("Status inválido.");
      }
      this._status = value;
  }

  public validar(): void {
      if (!this._veiculo) {
          throw new Error("Veículo da ordem de serviço é obrigatório.");
      }
      if (!this._descricao) {
          throw new Error("Descrição da ordem de serviço é obrigatória.");
      }
      if (this._valor <= 0) {
          throw new Error("Valor da ordem de serviço deve ser um número positivo.");
      }
      const validStatus = ["Aberta", "Em andamento", "Finalizada"];
      if (!validStatus.includes(this._status)) {
          throw new Error("Status da ordem de serviço é inválido.");
      }
  }

  public toJSON(): any {
      return {
          id: this._id,
          veiculo: this._veiculo,
          descricao: this._descricao,
          valor: this._valor,
          status: this._status,
      };
  }

  public static fromJSON(json: any): OrdemServico {
      if (!json.id || !json.veiculo || !json.descricao || !json.valor || !json.status) {
          throw new Error("Dados JSON incompletos para Ordem de Serviço.");
      }
      return new OrdemServico(json.id, json.veiculo, json.descricao, json.valor, json.status);
  }
}
