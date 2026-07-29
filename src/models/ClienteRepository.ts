import fs from "fs/promises";
import path from "path";

export class ClienteRepository {

    private arquivo = path.join(
        __dirname,
        "../../dados/clientes.json"
    );


    private async ler() {

        const dados = await fs.readFile(
            this.arquivo,
            "utf-8"
        );

        if (!dados.trim()) {
            return [];
        }

        return JSON.parse(dados);

    }


    private async salvar(clientes: any[]) {

        await fs.writeFile(
            this.arquivo,
            JSON.stringify(clientes, null, 2)
        );

    }


    async listar() {

        return await this.ler();

    }


    async buscarPorId(id: string) {

        const clientes = await this.ler();

        return clientes.find(
            (cliente: any) => cliente.id === id
        );

    }


    async criar(cliente: any) {

        const clientes = await this.ler();

        const novoCliente = {

            id: Date.now().toString(),

            ...cliente

        };

        clientes.push(novoCliente);

        await this.salvar(clientes);

        return novoCliente;

    }


    async atualizar(id: string, dados: any) {

        const clientes = await this.ler();

        const index = clientes.findIndex(
            (cliente: any) => cliente.id === id
        );

        if (index === -1) {

            throw new Error(
                "Cliente não encontrado"
            );

        }

        clientes[index] = {

            ...clientes[index],

            ...dados

        };

        await this.salvar(clientes);

        return clientes[index];

    }


    async remover(id: string) {

        const clientes = await this.ler();

        const novosClientes = clientes.filter(
            (cliente: any) => cliente.id !== id
        );

        await this.salvar(novosClientes);

    }

}