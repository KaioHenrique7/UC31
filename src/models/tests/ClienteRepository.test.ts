import { ClienteRepository } from "../ClienteRepository";
import { Cliente } from "../../entities/Cliente";
import fs from "fs/promises";
import path from "path";

describe("ClienteRepository", () => {
    const repository = new ClienteRepository();
    const arquivoTeste = path.join(__dirname, "../../../dados/clientes.json");

    beforeEach(async () => {
        // Limpa o arquivo de teste antes de cada teste
        try {
            await fs.writeFile(arquivoTeste, "[]", "utf-8");
        } catch (error) {
            // Arquivo pode não existir ainda
        }
    });

    afterAll(async () => {
        // Limpa o arquivo após todos os testes
        try {
            await fs.unlink(arquivoTeste);
        } catch (error) {
            // Arquivo pode não existir
        }
    });

    test("deve criar um novo cliente", async () => {
        const novoCliente = await repository.criar({
            nome: "João Silva",
            telefone: "11999999999",
            email: "joao@example.com"
        });

        expect(novoCliente).toBeInstanceOf(Cliente);
        expect(novoCliente.nome).toBe("João Silva");
        expect(novoCliente.email).toBe("joao@example.com");
    });

    test("deve listar todos os clientes", async () => {
        await repository.criar({
            nome: "João Silva",
            telefone: "11999999999",
            email: "joao@example.com"
        });

        await repository.criar({
            nome: "Maria Santos",
            telefone: "11988888888",
            email: "maria@example.com"
        });

        const clientes = await repository.listar();
        expect(clientes.length).toBe(2);
        expect(clientes[0]).toBeInstanceOf(Cliente);
    });

    test("deve buscar um cliente por ID", async () => {
        const novoCliente = await repository.criar({
            nome: "João Silva",
            telefone: "11999999999",
            email: "joao@example.com"
        });

        const clienteBuscado = await repository.buscarPorId(novoCliente.id);
        expect(clienteBuscado).toBeDefined();
        expect(clienteBuscado?.nome).toBe("João Silva");
    });

    test("deve retornar undefined ao buscar um cliente inexistente", async () => {
        const clienteBuscado = await repository.buscarPorId("id-inexistente");
        expect(clienteBuscado).toBeUndefined();
    });

    test("deve atualizar um cliente", async () => {
        const novoCliente = await repository.criar({
            nome: "João Silva",
            telefone: "11999999999",
            email: "joao@example.com"
        });

        const clienteAtualizado = await repository.atualizar(novoCliente.id, {
            nome: "João Silva Atualizado",
            telefone: "11988888888",
            email: "joao.atualizado@example.com"
        });

        expect(clienteAtualizado.nome).toBe("João Silva Atualizado");
        expect(clienteAtualizado.email).toBe("joao.atualizado@example.com");
    });

    test("deve lançar erro ao atualizar um cliente inexistente", async () => {
        await expect(
            repository.atualizar("id-inexistente", {
                nome: "Novo Nome"
            })
        ).rejects.toThrow("Cliente não encontrado");
    });

    test("deve remover um cliente", async () => {
        const novoCliente = await repository.criar({
            nome: "João Silva",
            telefone: "11999999999",
            email: "joao@example.com"
        });

        await repository.remover(novoCliente.id);

        const clienteBuscado = await repository.buscarPorId(novoCliente.id);
        expect(clienteBuscado).toBeUndefined();
    });

    test("deve lançar erro ao criar um cliente com e-mail inválido", async () => {
        await expect(
            repository.criar({
                nome: "João Silva",
                telefone: "11999999999",
                email: "email-invalido"
            })
        ).rejects.toThrow("E-mail do cliente é inválido");
    });

    test("deve lançar erro ao criar um cliente sem nome", async () => {
        await expect(
            repository.criar({
                nome: "",
                telefone: "11999999999",
                email: "joao@example.com"
            })
        ).rejects.toThrow("Nome do cliente é obrigatório");
    });

    test("deve lançar erro ao criar um cliente sem telefone", async () => {
        await expect(
            repository.criar({
                nome: "João Silva",
                telefone: "",
                email: "joao@example.com"
            })
        ).rejects.toThrow("Telefone do cliente é obrigatório");
    });
});
