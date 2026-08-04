import fs from "fs/promises";
import path from "path";
import { Cliente } from "../entities/Cliente";

export class ClienteRepository {
    private arquivo = path.join(
        __dirname,
        "../../dados/clientes.json"
    );

    private async ler(): Promise<Cliente[]> {
        try {
            const dados = await fs.readFile(this.arquivo, "utf-8");
            if (!dados.trim()) {
                return [];
            }
            const clientesData = JSON.parse(dados);
            return clientesData.map((data: any) => Cliente.fromJSON(data));
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.arquivo, '[]', 'utf-8');
                return [];
            }
            throw error;
        }
    }

    private async salvar(clientes: Cliente[]): Promise<void> {
        await fs.writeFile(
            this.arquivo,
            JSON.stringify(clientes.map(cliente => cliente.toJSON()), null, 2)
        );
    }

    async listar(): Promise<Cliente[]> {
        return await this.ler();
    }

    async buscarPorId(id: string): Promise<Cliente | undefined> {
        const clientes = await this.ler();
        return clientes.find((cliente: Cliente) => cliente.id === id);
    }

    async criar(clienteData: { nome: string; telefone: string; email: string }): Promise<Cliente> {
        const clientes = await this.ler();
        const novoCliente = new Cliente(Date.now().toString(), clienteData.nome, clienteData.telefone, clienteData.email);
        novoCliente.validar(); // Garante que o objeto é válido antes de salvar
        clientes.push(novoCliente);
        await this.salvar(clientes);
        return novoCliente;
    }

    async atualizar(id: string, dados: { nome?: string; telefone?: string; email?: string }): Promise<Cliente> {
        const clientes = await this.ler();
        const index = clientes.findIndex((cliente: Cliente) => cliente.id === id);

        if (index === -1) {
            throw new Error("Cliente não encontrado");
        }

        const clienteExistente = clientes[index];
        // Atualiza apenas os campos fornecidos
        if (dados.nome !== undefined) clienteExistente.nome = dados.nome;
        if (dados.telefone !== undefined) clienteExistente.telefone = dados.telefone;
        if (dados.email !== undefined) clienteExistente.email = dados.email;
        
        clienteExistente.validar(); // Valida o objeto atualizado
        clientes[index] = clienteExistente;
        await this.salvar(clientes);
        return clienteExistente;
    }

    async remover(id: string): Promise<void> {
        const clientes = await this.ler();
        const novosClientes = clientes.filter((cliente: Cliente) => cliente.id !== id);
        await this.salvar(novosClientes);
    }
}
