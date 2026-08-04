import fs from "fs/promises";
import path from "path";
import { Veiculo } from "../entities/veiculos";

export class VeiculoRepository {
    private arquivo = path.join(
        __dirname,
        "../../dados/veiculos.json"
    );

    private async ler(): Promise<Veiculo[]> {
        try {
            const dados = await fs.readFile(this.arquivo, "utf-8");
            if (!dados.trim()) {
                return [];
            }
            const veiculosData = JSON.parse(dados);
            return veiculosData.map((data: any) => Veiculo.fromJSON(data));
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.arquivo, '[]', 'utf-8');
                return [];
            }
            throw error;
        }
    }

    private async salvar(veiculos: Veiculo[]): Promise<void> {
        await fs.writeFile(
            this.arquivo,
            JSON.stringify(veiculos.map(veiculo => veiculo.toJSON()), null, 2)
        );
    }

    async listar(): Promise<Veiculo[]> {
        return await this.ler();
    }

    async buscarPorId(id: string): Promise<Veiculo | undefined> {
        const veiculos = await this.ler();
        return veiculos.find((veiculo: Veiculo) => veiculo.id === id);
    }

    async criar(veiculoData: { placa: string; modelo: string; marca: string; ano: number; clienteId: string; foto: string }): Promise<Veiculo> {
        const veiculos = await this.ler();
        const novoVeiculo = new Veiculo(Date.now().toString(), veiculoData.placa, veiculoData.modelo, veiculoData.marca, veiculoData.ano, veiculoData.clienteId, veiculoData.foto);
        novoVeiculo.validar();
        veiculos.push(novoVeiculo);
        await this.salvar(veiculos);
        return novoVeiculo;
    }

    async atualizar(id: string, dados: { placa?: string; modelo?: string; marca?: string; ano?: number; clienteId?: string; foto?: string }): Promise<Veiculo> {
        const veiculos = await this.ler();
        const index = veiculos.findIndex((veiculo: Veiculo) => veiculo.id === id);

        if (index === -1) {
            throw new Error("Veículo não encontrado");
        }

        const veiculoExistente = veiculos[index];
        if (dados.placa !== undefined) veiculoExistente.placa = dados.placa;
        if (dados.modelo !== undefined) veiculoExistente.modelo = dados.modelo;
        if (dados.marca !== undefined) veiculoExistente.marca = dados.marca;
        if (dados.ano !== undefined) veiculoExistente.ano = dados.ano;
        if (dados.clienteId !== undefined) veiculoExistente.clienteId = dados.clienteId;
        if (dados.foto !== undefined) veiculoExistente.foto = dados.foto;
        
        veiculoExistente.validar();
        veiculos[index] = veiculoExistente;
        await this.salvar(veiculos);
        return veiculoExistente;
    }

    async remover(id: string): Promise<void> {
        const veiculos = await this.ler();
        const novosVeiculos = veiculos.filter((veiculo: Veiculo) => veiculo.id !== id);
        await this.salvar(novosVeiculos);
    }
}
