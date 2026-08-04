import fs from "fs/promises";
import path from "path";
import { Usuario } from "../entities/Usuarios";
import bcrypt from "bcrypt";

class UsuarioRepository {
    private caminho = path.join(__dirname, "../../dados/usuarios.json");

    private async ler(): Promise<Usuario[]> {
        try {
            const dados = await fs.readFile(this.caminho, "utf-8");
            if (!dados.trim()) {
                return [];
            }
            const usuariosData = JSON.parse(dados);
            return usuariosData.map((data: any) => Usuario.fromJSON(data));
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.caminho, '[]', 'utf-8');
                return [];
            }
            throw error;
        }
    }

    private async salvar(usuarios: Usuario[]): Promise<void> {
        await fs.writeFile(
            this.caminho,
            JSON.stringify(usuarios.map(usuario => usuario.toJSON()), null, 2)
        );
    }

    async listar(): Promise<Usuario[]> {
        return await this.ler();
    }

    async buscarPorEmail(email: string): Promise<Usuario | undefined> {
        const usuarios = await this.ler();
        return usuarios.find(u => u.email === email);
    }

    async criar(usuarioData: { nome: string; email: string; senha: string }): Promise<Usuario> {
        const usuarios = await this.ler();
        // Verifica se já existe um usuário com o mesmo e-mail
        if (usuarios.some(u => u.email === usuarioData.email)) {
            throw new Error("Já existe um usuário com este e-mail.");
        }
        const hashedPassword = await bcrypt.hash(usuarioData.senha, 10);
        const novoUsuario = new Usuario(Date.now().toString(), usuarioData.nome, usuarioData.email, hashedPassword);
        novoUsuario.validar();
        usuarios.push(novoUsuario);
        await this.salvar(usuarios);
        return novoUsuario;
    }

    async login(email: string, senha: string): Promise<Usuario | undefined> {
        const usuarios = await this.ler();
        const usuario = usuarios.find(u => u.email === email);

        if (usuario && await bcrypt.compare(senha, usuario.senha)) {
            return usuario;
        }
        return undefined;
    }

    async atualizar(id: string, dados: { nome?: string; email?: string; senha?: string }): Promise<Usuario> {
        const usuarios = await this.ler();
        const index = usuarios.findIndex((usuario: Usuario) => usuario.id === id);

        if (index === -1) {
            throw new Error("Usuário não encontrado");
        }

        const usuarioExistente = usuarios[index];
        if (dados.nome !== undefined) usuarioExistente.nome = dados.nome;
        if (dados.email !== undefined) {
            // Verifica se o novo e-mail já está em uso por outro usuário
            if (usuarios.some(u => u.email === dados.email && u.id !== id)) {
                throw new Error("Já existe outro usuário com este e-mail.");
            }
            usuarioExistente.email = dados.email;
        }
        if (dados.senha !== undefined) {
            const hashedPassword = await bcrypt.hash(dados.senha, 10);
            usuarioExistente.senha = hashedPassword;
        }
        
        usuarioExistente.validar();
        usuarios[index] = usuarioExistente;
        await this.salvar(usuarios);
        return usuarioExistente;
    }

    async remover(id: string): Promise<void> {
        const usuarios = await this.ler();
        const novosUsuarios = usuarios.filter((usuario: Usuario) => usuario.id !== id);
        await this.salvar(novosUsuarios);
    }
}

export default UsuarioRepository;
