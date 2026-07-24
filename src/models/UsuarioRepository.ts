import fs from "fs";
import path from "path";
import { Usuario } from "../entities/Usuarios";

export class UsuarioRepository {
  private caminho = path.join(__dirname, "../../dados/usuarios.json");

  private ler(): Usuario[] {
    if (!fs.existsSync(this.caminho)) {
      fs.writeFileSync(this.caminho, "[]");
    }

    return JSON.parse(fs.readFileSync(this.caminho, "utf8"));
  }

  private salvar(usuarios: Usuario[]): void {
    fs.writeFileSync(this.caminho, JSON.stringify(usuarios, null, 2));
  }

  listar(): Usuario[] {
    return this.ler();
  }

  buscarPorEmail(email: string): Usuario | undefined {
    return this.ler().find(u => u.email === email);
  
  }
  
  login(email: string, senha: string): Usuario | undefined {
    return this.ler().find(
      usuario => usuario.email === email && usuario.senha === senha
    );
  }

  criar(usuario: Usuario): void {
    const usuarios = this.ler();
    usuarios.push(usuario);
    this.salvar(usuarios);
    
  }
}
