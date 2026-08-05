import { VeiculoRepository } from "../VeiculoRepository";
import { Veiculo } from "../../entities/veiculos";
import fs from "fs/promises";
import path from "path";

describe("VeiculoRepository", () => {
    let repository: VeiculoRepository;
    const arquivoTeste = path.join(__dirname, "../../../dados/veiculos.json");

    beforeEach(async () => {
        repository = new VeiculoRepository();
        
        try {
            await fs.writeFile(arquivoTeste, "[]", "utf-8");
        } catch (error) {
            // Arquivo pode não existir ainda
        }
    });

    afterAll(async () => {
        try {
            await fs.unlink(arquivoTeste);
        } catch (error) {
            // Arquivo pode não existir
        }
    });

    test("deve criar um novo veículo", async () => {
        const novoVeiculo = await repository.criar({
            placa: "ABC1234",
            modelo: "Civic",
            marca: "Honda",
            ano: 2022,
            clienteId: "cliente-1",
            foto: "civic.jpg"
        });

        expect(novoVeiculo).toBeInstanceOf(Veiculo);
        expect(novoVeiculo.placa).toBe("ABC1234");
        expect(novoVeiculo.modelo).toBe("Civic");
    });

    test("deve listar todos os veículos", async () => {
        await repository.criar({
            placa: "ABC1234",
            modelo: "Civic",
            marca: "Honda",
            ano: 2022,
            clienteId: "cliente-1",
            foto: "civic.jpg"
        });

        await repository.criar({
            placa: "XYZ5678",
            modelo: "Corolla",
            marca: "Toyota",
            ano: 2021,
            clienteId: "cliente-2",
            foto: "corolla.jpg"
        });

        const veiculos = await repository.listar();
        expect(veiculos.length).toBe(2);
        expect(veiculos[0]).toBeInstanceOf(Veiculo);
    });

    test("deve buscar um veículo por ID", async () => {
        const novoVeiculo = await repository.criar({
            placa: "ABC1234",
            modelo: "Civic",
            marca: "Honda",
            ano: 2022,
            clienteId: "cliente-1",
            foto: "civic.jpg"
        });

        const veiculoBuscado = await repository.buscarPorId(novoVeiculo.id);
        expect(veiculoBuscado).toBeDefined();
        expect(veiculoBuscado?.placa).toBe("ABC1234");
    });

    test("deve retornar undefined ao buscar um veículo inexistente", async () => {
        const veiculoBuscado = await repository.buscarPorId("id-inexistente");
        expect(veiculoBuscado).toBeUndefined();
    });

    test("deve atualizar um veículo", async () => {
        const novoVeiculo = await repository.criar({
            placa: "ABC1234",
            modelo: "Civic",
            marca: "Honda",
            ano: 2022,
            clienteId: "cliente-1",
            foto: "civic.jpg"
        });

        const veiculoAtualizado = await repository.atualizar(novoVeiculo.id, {
            placa: "ABC9999",
            modelo: "Accord",
            marca: "Honda",
            ano: 2023,
            clienteId: "cliente-1",
            foto: "accord.jpg"
        });

        expect(veiculoAtualizado.placa).toBe("ABC9999");
        expect(veiculoAtualizado.modelo).toBe("Accord");
    });

    test("deve lançar erro ao atualizar um veículo inexistente", async () => {
        await expect(
            repository.atualizar("id-inexistente", {
                placa: "ABC1234"
            })
        ).rejects.toThrow("Veículo não encontrado");
    });

    test("deve remover um veículo", async () => {
        const novoVeiculo = await repository.criar({
            placa: "ABC1234",
            modelo: "Civic",
            marca: "Honda",
            ano: 2022,
            clienteId: "cliente-1",
            foto: "civic.jpg"
        });

        await repository.remover(novoVeiculo.id);

        const veiculoBuscado = await repository.buscarPorId(novoVeiculo.id);
        expect(veiculoBuscado).toBeUndefined();
    });

    test("deve lançar erro ao criar um veículo com placa inválida", async () => {
        await expect(
            repository.criar({
                placa: "",
                modelo: "Civic",
                marca: "Honda",
                ano: 2022,
                clienteId: "cliente-1",
                foto: "civic.jpg"
            })
        ).rejects.toThrow("Placa é obrigatória");
    });

    test("deve lançar erro ao criar um veículo com ano inválido", async () => {
        await expect(
            repository.criar({
                placa: "ABC1234",
                modelo: "Civic",
                marca: "Honda",
                ano: 1800,
                clienteId: "cliente-1",
                foto: "civic.jpg"
            })
        ).rejects.toThrow("Ano do veículo deve ser maior que 1900");
    });

    test("deve lançar erro ao criar um veículo sem modelo", async () => {
        await expect(
            repository.criar({
                placa: "ABC1234",
                modelo: "",
                marca: "Honda",
                ano: 2022,
                clienteId: "cliente-1",
                foto: "civic.jpg"
            })
        ).rejects.toThrow("Modelo é obrigatório");
    });
});
