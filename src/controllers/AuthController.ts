import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UsuarioRepository from "../models/UsuarioRepository";

export default class AuthController {

    static login(req: Request, res: Response) {
        res.render("login");
    }

    static registro(req: Request, res: Response) {
        res.render("registro");
    }

    static async cadastrar(req: Request, res: Response) {

        const { nome, email, senha } = req.body;

        const hash = await bcrypt.hash(senha, 10);

        UsuarioRepository.criar({
            nome,
            email,
            senha: hash,
            id: ""
        });

        res.redirect("/auth/login");
    }

    static async autenticar(req: Request, res: Response) {

        const { email, senha } = req.body;

        const usuario = await UsuarioRepository.buscarPorEmail(email);

        if (!usuario) {
            return res.render("login", {
                erro: "Usuário não encontrado"
            });
        }

        const ok = await bcrypt.compare(senha, usuario.senha);

        if (!ok) {
            return res.render("login", {
                erro: "Senha incorreta"
            });
        }

        (req as any).usuario = usuario;

        res.redirect("/");
    }

    static logout(req: Request, res: Response) {

        (req as any).session.destroy(() => {
            res.redirect("/auth/login");
        });

    }
}