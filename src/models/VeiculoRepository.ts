import fs from "fs";
import path from "path";
import { Veiculos } from "../entities/Veiculos";

export class VeiculoRepository {

  private caminho = path.join(
    __dirname,
    "../../dados/veiculos.json"
  );

  private ler(): Veiculos[] {

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

  private salvar(veiculos: Veiculos[]): void {

    fs.writeFileSync(
      this.caminho,
      JSON.stringify(veiculos, null, 2)
    );

  }

  listar(): Veiculos[] {
    return this.ler();
  }

  buscarPorId(id: string): Veiculos | undefined {

    return this.ler().find(
      veiculo => veiculo.id === id
    );

  }

  criar(dados: Omit<Veiculos, "id">): Veiculos {

    const veiculos = this.ler();

    const novoVeiculo: Veiculos = {

      id: Date.now().toString(),

      ...dados

    };

    veiculos.push(novoVeiculo);

    this.salvar(veiculos);

    return novoVeiculo;
  }

  atualizar(
    id: string,
    dados: Partial<Veiculos>
  ): Veiculos {

    const veiculos = this.ler();

    const index = veiculos.findIndex(
      veiculo => veiculo.id === id
    );

    if (index === -1) {
      throw new Error(
        "Veículo não encontrado"
      );
    }

    veiculos[index] = {

      ...veiculos[index],

      ...dados,

      id

    };

    this.salvar(veiculos);

    return veiculos[index];
  }

  remover(id: string): void {

    const veiculos = this.ler().filter(
      veiculo => veiculo.id !== id
    );

    this.salvar(veiculos);
  }

}