export class Usuario {
  private _id: string;
  private _nome: string;
  private _email: string;
  private _senha: string; // Senha já hashada

  constructor(id: string, nome: string, email: string, senha: string) {
      this._id = id;
      this._nome = nome;
      this._email = email;
      this._senha = senha;
      this.validar();
  }

  public get id(): string {
      return this._id;
  }

  public get nome(): string {
      return this._nome;
  }

  public set nome(value: string) {
      if (!value) {
          throw new Error("Nome é obrigatório.");
      }
      this._nome = value;
  }

  public get email(): string {
      return this._email;
  }

  public set email(value: string) {
      if (!value || !Usuario.isValidEmail(value)) {
          throw new Error("E-mail inválido.");
      }
      this._email = value;
  }

  public get senha(): string {
      return this._senha;
  }

  public set senha(value: string) {
      if (!value) {
          throw new Error("Senha é obrigatória.");
      }
      this._senha = value;
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  public validar(): void {
      if (!this._nome) {
          throw new Error("Nome do usuário é obrigatório.");
      }
      if (!this._email || !Usuario.isValidEmail(this._email)) {
          throw new Error("E-mail do usuário é inválido.");
      }
      if (!this._senha) {
          throw new Error("Senha do usuário é obrigatória.");
      }
  }

  public toJSON(): any {
      return {
          id: this._id,
          nome: this._nome,
          email: this._email,
          senha: this._senha, // A senha já deve estar hashada aqui
      };
  }

  public static fromJSON(json: any): Usuario {
      if (!json.id || !json.nome || !json.email || !json.senha) {
          throw new Error("Dados JSON incompletos para Usuário.");
      }
      return new Usuario(json.id, json.nome, json.email, json.senha);
  }
}
