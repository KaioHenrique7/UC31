import fs from "fs";
import path from "path";
import { Cliente } from "../entities/Cliente";

export class ClienteRepository {
  private caminho = path.join(__dirname, "../../dados/clientes.json");

  private ler(): Cliente[] {
    if (!fs.existsSync(this.caminho)) {
      fs.writeFileSync(this.caminho, "[]");
    }

    return JSON.parse(fs.readFileSync(this.caminho, "utf8"));
  }

  private salvar(clientes: Cliente[]): void {
    fs.writeFileSync(this.caminho, JSON.stringify(clientes, null, 2));
  }

  listar(): Cliente[] {
    return this.ler();
  }

  buscarPorId(id: string): Cliente | undefined {
    return this.ler().find(c => c.id === id);
  }

  criar(cliente: Cliente): void {
    const clientes = this.ler();
    clientes.push(cliente);
    this.salvar(clientes);
  }

  atualizar(p0: string, cliente: Cliente): void {
    const clientes = this.ler();

    const index = clientes.findIndex(c => c.id === cliente.id);

    if (index !== -1) {
      clientes[index] = cliente;
      this.salvar(clientes);
    }
  }

  remover(id: string): void {
    const clientes = this.ler().filter(c => c.id !== id);
    this.salvar(clientes);
  }
}