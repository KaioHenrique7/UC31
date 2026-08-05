import  UsuarioRepository from "../UsuarioRepository";
import { Usuario } from "../../entities/Usuarios";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";

describe("UsuarioRepository", () => {
    let repository: UsuarioRepository;
    const arquivoTeste = path.join(__dirname, "../../../dados/usuarios.json");

    beforeEach(async () => {
        // Cria uma nova instância para cada teste
        repository = new UsuarioRepository();
        
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

    test("deve criar um novo usuário com senha criptografada", async () => {
        const novoUsuario = await repository.criar({
            nome: "João Silva",
            email: "joao@example.com",
            senha: "senha123"
        });

        expect(novoUsuario).toBeInstanceOf(Usuario);
        expect(novoUsuario.nome).toBe("João Silva");
        expect(novoUsuario.email).toBe("joao@example.com");
        // Verifica se a senha foi criptografada (não é a mesma que foi enviada)
        expect(novoUsuario.senha).not.toBe("senha123");
    });

    test("deve fazer login com credenciais corretas", async () => {
        await repository.criar({
            nome: "João Silva",
            email: "joao@example.com",
            senha: "senha123"
        });

        const usuarioLogin = await repository.login("joao@example.com", "senha123");
        expect(usuarioLogin).toBeDefined();
        expect(usuarioLogin?.email).toBe("joao@example.com");
    });

    test("deve retornar undefined ao fazer login com senha incorreta", async () => {
        await repository.criar({
            nome: "João Silva",
            email: "joao@example.com",
            senha: "senha123"
        });

        const usuarioLogin = await repository.login("joao@example.com", "senhaErrada");
        expect(usuarioLogin).toBeUndefined();
    });

    test("deve retornar undefined ao fazer login com e-mail inexistente", async () => {
        const usuarioLogin = await repository.login("inexistente@example.com", "senha123");
        expect(usuarioLogin).toBeUndefined();
    });

    test("deve listar todos os usuários", async () => {
        await repository.criar({
            nome: "João Silva",
            email: "joao@example.com",
            senha: "senha123"
        });

        await repository.criar({
            nome: "Maria Santos",
            email: "maria@example.com",
            senha: "senha456"
        });

        const usuarios = await repository.listar();
        expect(usuarios.length).toBe(2);
        expect(usuarios[0]).toBeInstanceOf(Usuario);
    });

    test("deve buscar um usuário por e-mail", async () => {
        await repository.criar({
            nome: "João Silva",
            email: "joao@example.com",
            senha: "senha123"
        });

        const usuarioBuscado = await repository.buscarPorEmail("joao@example.com");
        expect(usuarioBuscado).toBeDefined();
        expect(usuarioBuscado?.nome).toBe("João Silva");
    });

    test("deve retornar undefined ao buscar um usuário inexistente por e-mail", async () => {
        const usuarioBuscado = await repository.buscarPorEmail("inexistente@example.com");
        expect(usuarioBuscado).toBeUndefined();
    });

    test("deve lançar erro ao criar um usuário com e-mail duplicado", async () => {
        await repository.criar({
            nome: "João Silva",
            email: "joao@example.com",
            senha: "senha123"
        });

        await expect(
            repository.criar({
                nome: "Outro João",
                email: "joao@example.com",
                senha: "senha456"
            })
        ).rejects.toThrow("Já existe um usuário com este e-mail");
    });

    test("deve lançar erro ao criar um usuário com e-mail inválido", async () => {
        await expect(
            repository.criar({
                nome: "João Silva",
                email: "email-invalido",
                senha: "senha123"
            })
        ).rejects.toThrow("E-mail do usuário é inválido");
    });

    test("deve lançar erro ao criar um usuário sem nome", async () => {
        await expect(
            repository.criar({
                nome: "",
                email: "joao@example.com",
                senha: "senha123"
            })
        ).rejects.toThrow("Nome do usuário é obrigatório");
    });

    test("deve atualizar a senha de um usuário", async () => {
        const novoUsuario = await repository.criar({
            nome: "João Silva",
            email: "joao@example.com",
            senha: "senha123"
        });

        await repository.atualizar(novoUsuario.id, {
            senha: "novaSenha456"
        });

        // Tenta fazer login com a nova senha
        const usuarioLogin = await repository.login("joao@example.com", "novaSenha456");
        expect(usuarioLogin).toBeDefined();

        // Tenta fazer login com a senha antiga (deve falhar)
        const usuarioLoginAntigo = await repository.login("joao@example.com", "senha123");
        expect(usuarioLoginAntigo).toBeUndefined();
    });
});
