import { OrdemRepository } from "../OrdemRepository";
import { OrdemServico } from "../../entities/OrdemServiço";
import fs from "fs/promises";
import path from "path";

describe("OrdemRepository", () => {
    let repository: OrdemRepository;
    const arquivoTeste = path.join(__dirname, "../../../dados/ordens.json");

    beforeEach(async () => {
        repository = new OrdemRepository();
        
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

    test("deve criar uma nova ordem de serviço", async () => {
        const novaOrdem = await repository.criar({
            veiculo: "ABC1234",
            descricao: "Troca de óleo",
            valor: 150.00,
            status: "Aberta"
        });

        expect(novaOrdem).toBeInstanceOf(OrdemServico);
        expect(novaOrdem.veiculo).toBe("ABC1234");
        expect(novaOrdem.descricao).toBe("Troca de óleo");
        expect(novaOrdem.status).toBe("Aberta");
    });

    test("deve listar todas as ordens de serviço", async () => {
        await repository.criar({
            veiculo: "ABC1234",
            descricao: "Troca de óleo",
            valor: 150.00,
            status: "Aberta"
        });

        await repository.criar({
            veiculo: "XYZ5678",
            descricao: "Revisão completa",
            valor: 500.00,
            status: "Em andamento"
        });

        const ordens = await repository.listar();
        expect(ordens.length).toBe(2);
        expect(ordens[0]).toBeInstanceOf(OrdemServico);
    });

    test("deve buscar uma ordem de serviço por ID", async () => {
        const novaOrdem = await repository.criar({
            veiculo: "ABC1234",
            descricao: "Troca de óleo",
            valor: 150.00,
            status: "Aberta"
        });

        const ordemBuscada = await repository.buscarPorId(novaOrdem.id);
        expect(ordemBuscada).toBeDefined();
        expect(ordemBuscada?.veiculo).toBe("ABC1234");
    });

    test("deve retornar undefined ao buscar uma ordem inexistente", async () => {
        const ordemBuscada = await repository.buscarPorId("id-inexistente");
        expect(ordemBuscada).toBeUndefined();
    });

    test("deve atualizar uma ordem de serviço", async () => {
        const novaOrdem = await repository.criar({
            veiculo: "ABC1234",
            descricao: "Troca de óleo",
            valor: 150.00,
            status: "Aberta"
        });

        const ordemAtualizada = await repository.atualizar(novaOrdem.id, {
            veiculo: "ABC1234",
            descricao: "Troca de óleo e filtro",
            valor: 200.00,
            status: "Em andamento"
        });

        expect(ordemAtualizada.descricao).toBe("Troca de óleo e filtro");
        expect(ordemAtualizada.valor).toBe(200.00);
        expect(ordemAtualizada.status).toBe("Em andamento");
    });

    test("deve lançar erro ao atualizar uma ordem inexistente", async () => {
        await expect(
            repository.atualizar("id-inexistente", {
                descricao: "Novo texto"
            })
        ).rejects.toThrow("Ordem de Serviço não encontrada");
    });

    test("deve remover uma ordem de serviço", async () => {
        const novaOrdem = await repository.criar({
            veiculo: "ABC1234",
            descricao: "Troca de óleo",
            valor: 150.00,
            status: "Aberta"
        });

        await repository.remover(novaOrdem.id);

        const ordemBuscada = await repository.buscarPorId(novaOrdem.id);
        expect(ordemBuscada).toBeUndefined();
    });

    test("deve lançar erro ao criar uma ordem com veículo inválido", async () => {
        await expect(
            repository.criar({
                veiculo: "",
                descricao: "Troca de óleo",
                valor: 150.00,
                status: "Aberta"
            })
        ).rejects.toThrow("Veículo é obrigatório");
    });

    test("deve lançar erro ao criar uma ordem com status inválido", async () => {
        await expect(
            repository.criar({
                veiculo: "ABC1234",
                descricao: "Troca de óleo",
                valor: 150.00,
                status: "StatusInvalido" as any
            })
        ).rejects.toThrow("Status da ordem de serviço é inválido");
    });

    test("deve lançar erro ao criar uma ordem com valor negativo", async () => {
        await expect(
            repository.criar({
                veiculo: "ABC1234",
                descricao: "Troca de óleo",
                valor: -50.00,
                status: "Aberta"
            })
        ).rejects.toThrow("Valor da ordem de serviço deve ser maior que zero");
    });
});
