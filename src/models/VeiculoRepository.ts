import fs from "fs";
import path from "path";
import { Veiculos } from "../entities/veiculos";

export class VeiculoRepository {

    private caminho = path.join(
        __dirname,
        "../../dados/veiculos.json"
    );


    private ler(): Veiculos[] {

        if (!fs.existsSync(this.caminho)) {

            fs.writeFileSync(
                this.caminho,
                "[]"
            );

        }

        return JSON.parse(
            fs.readFileSync(
                this.caminho,
                "utf8"
            )
        );

    }


    private salvar(veiculos: Veiculos[]): void {

        fs.writeFileSync(
            this.caminho,
            JSON.stringify(
                veiculos,
                null,
                2
            )
        );

    }


    listar(): Veiculos[] {

        return this.ler();

    }


    buscarPorId(
        id: string
    ): Veiculos | undefined {

        return this.ler().find(
            v => v.id === id
        );

    }


    criar(veiculo: Veiculos): void {

        const veiculos = this.ler();

        veiculos.push(veiculo);

        this.salvar(veiculos);

    }


    atualizar(veiculo: Veiculos): void {

        const veiculos = this.ler();

        const index = veiculos.findIndex(
            v => v.id === veiculo.id
        );

        if (index !== -1) {

            veiculos[index] = veiculo;

            this.salvar(veiculos);

        }

    }


    remover(id: string): void {

        const veiculos = this.ler().filter(
            v => v.id !== id
        );

        this.salvar(veiculos);

    }

}