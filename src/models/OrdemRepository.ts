import fs from "fs";
import path from "path";
import { OrdemServico } from "../entities/OrdemServiço";

export class OrdemRepository {

  private caminho = path.join(
    __dirname,
    "../../dados/ordens.json"
  );

  private ler(): OrdemServico[] {

    if (!fs.existsSync(this.caminho)) {
      fs.writeFileSync(this.caminho, "[]");
    }

    const dados = fs.readFileSync(
      this.caminho,
      "utf8"
    );

    if (!dados.trim()) {
      return [];
    }

    return JSON.parse(dados);
  }

  private salvar(ordens: OrdemServico[]): void {

    fs.writeFileSync(
      this.caminho,
      JSON.stringify(ordens, null, 2)
    );

  }

  listar(): OrdemServico[] {
    return this.ler();
  }

  buscarPorId(id: string): OrdemServico | undefined {

    return this.ler().find(
      ordem => ordem.id === id
    );

  }

  criar(
    dados: Omit<OrdemServico, "id">
  ): OrdemServico {

    const ordens = this.ler();

    const novaOrdem: OrdemServico = {

      id: Date.now().toString(),

      ...dados

    };

    ordens.push(novaOrdem);

    this.salvar(ordens);

    return novaOrdem;
  }

  atualizar(
    id: string,
    dados: Partial<OrdemServico>
  ): OrdemServico {

    const ordens = this.ler();

    const index = ordens.findIndex(
      ordem => ordem.id === id
    );

    if (index === -1) {
      throw new Error(
        "Ordem não encontrada"
      );
    }

    ordens[index] = {

      ...ordens[index],

      ...dados,

      id

    };

    this.salvar(ordens);

    return ordens[index];
  }

  remover(id: string): void {

    const novasOrdens = this.ler().filter(
      ordem => ordem.id !== id
    );

    this.salvar(novasOrdens);
  }

}