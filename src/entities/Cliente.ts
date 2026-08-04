export class Cliente {
    private _id: string;
    private _nome: string;
    private _telefone: string;
    private _email: string;

    constructor(id: string, nome: string, telefone: string, email: string) {
        this._id = id;
        this._nome = nome;
        this._telefone = telefone;
        this._email = email;
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

    public get telefone(): string {
        return this._telefone;
    }

    public set telefone(value: string) {
        if (!value) {
            throw new Error("Telefone é obrigatório.");
        }
        this._telefone = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        if (!value || !Cliente.isValidEmail(value)) {
            throw new Error("E-mail inválido.");
        }
        this._email = value;
    }

    private static isValidEmail(email: string): boolean {
        const emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
        return emailRegex.test(email);
    }

    public validar(): void {
        if (!this._nome) {
            throw new Error("Nome do cliente é obrigatório.");
        }
        if (!this._telefone) {
            throw new Error("Telefone do cliente é obrigatório.");
        }
        if (!this._email || !Cliente.isValidEmail(this._email)) {
            throw new Error("E-mail do cliente é inválido.");
        }
    }

    public toJSON(): any {
        return {
            id: this._id,
            nome: this._nome,
            telefone: this._telefone,
            email: this._email,
        };
    }

    public static fromJSON(json: any): Cliente {
        if (!json.id || !json.nome || !json.telefone || !json.email) {
            throw new Error("Dados JSON incompletos para Cliente.");
        }
        return new Cliente(json.id, json.nome, json.telefone, json.email);
    }
}
