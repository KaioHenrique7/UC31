import fs from "fs/promises";
import path from "path";
import { OrdemServico } from "../entities/OrdemServico";

export class OrdemRepository {
    private arquivo = path.join(
        __dirname,
        "../../dados/ordens.json"
    );

    private async ler(): Promise<OrdemServico[]> {
        try {
            const dados = await fs.readFile(this.arquivo, "utf-8");
            if (!dados.trim()) {
                return [];
            }
            const ordensData = JSON.parse(dados);
            return ordensData.map((data: any) => OrdemServico.fromJSON(data));
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.arquivo, '[]', 'utf-8');
                return [];
            }
            throw error;
        }
    }

    private async salvar(ordens: OrdemServico[]): Promise<void> {
        await fs.writeFile(
            this.arquivo,
            JSON.stringify(ordens.map(ordem => ordem.toJSON()), null, 2)
        );
    }

    async listar(): Promise<OrdemServico[]> {
        return await this.ler();
    }

    async buscarPorId(id: string): Promise<OrdemServico | undefined> {
        const ordens = await this.ler();
        return ordens.find((ordem: OrdemServico) => ordem.id === id);
    }

    async criar(ordemData: { veiculo: string; descricao: string; valor: number; status: "Aberta" | "Em andamento" | "Finalizada" }): Promise<OrdemServico> {
        const ordens = await this.ler();
        const novaOrdem = new OrdemServico(Date.now().toString(), ordemData.veiculo, ordemData.descricao, ordemData.valor, ordemData.status);
        novaOrdem.validar();
        ordens.push(novaOrdem);
        await this.salvar(ordens);
        return novaOrdem;
    }

    async atualizar(id: string, dados: { veiculo?: string; descricao?: string; valor?: number; status?: "Aberta" | "Em andamento" | "Finalizada" }): Promise<OrdemServico> {
        const ordens = await this.ler();
        const index = ordens.findIndex((ordem: OrdemServico) => ordem.id === id);

        if (index === -1) {
            throw new Error("Ordem de Serviço não encontrada");
        }

        const ordemExistente = ordens[index];
        if (dados.veiculo !== undefined) ordemExistente.veiculo = dados.veiculo;
        if (dados.descricao !== undefined) ordemExistente.descricao = dados.descricao;
        if (dados.valor !== undefined) ordemExistente.valor = dados.valor;
        if (dados.status !== undefined) ordemExistente.status = dados.status;
        
        ordemExistente.validar();
        ordens[index] = ordemExistente;
        await this.salvar(ordens);
        return ordemExistente;
    }

    async remover(id: string): Promise<void> {
        const ordens = await this.ler();
        const novosOrdens = ordens.filter((ordem: OrdemServico) => ordem.id !== id);
        await this.salvar(novosOrdens);
    }
}
