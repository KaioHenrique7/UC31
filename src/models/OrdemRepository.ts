import fs from "fs";
import path from "path";
import { OrdemServico } from "../entities/Ordemservico";

export class OrdemRepository {
  private caminho = path.join(__dirname, "../../dados/ordens.json");

  private ler(): OrdemServico[] {
    if (!fs.existsSync(this.caminho)) {
      fs.writeFileSync(this.caminho, "[]");
    }

    return JSON.parse(fs.readFileSync(this.caminho, "utf8"));
  }

  private salvar(ordens: OrdemServico[]): void {
    fs.writeFileSync(this.caminho, JSON.stringify(ordens, null, 2));
  }

  listar(): OrdemServico[] {
    return this.ler();
  }

  buscarPorId(id: string): OrdemServico | undefined {
    return this.ler().find(o => o.id === id);
    
  }

  criar(ordem: OrdemServico): void {
    const ordens = this.ler();
    ordens.push(ordem);
    this.salvar(ordens);
  }

  atualizar(ordem: OrdemServico): void {
    const ordens = this.ler();

    const index = ordens.findIndex(o => o.id === ordem.id);

    if (index !== -1) {
      ordens[index] = ordem;
      this.salvar(ordens);
    }
  }

  remover(id: string): void {
    const ordens = this.ler().filter(o => o.id !== id);
    this.salvar(ordens);
  }
}