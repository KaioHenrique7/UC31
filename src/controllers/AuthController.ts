import { Router } from "express";
import UsuarioRepository from "../models/UsuarioRepository";
import { Usuario } from "../entities/Usuarios";

const router = Router();
const repository = new UsuarioRepository();

// Rota para exibir o formulário de login
router.get("/login", (req, res) => {
    res.render("login", { error: req.query.error });
});

// Rota para processar o login
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await repository.login(email, senha);

        if (!usuario) {
            return res.redirect("/auth/login?error=E-mail ou senha inválidos.");
        }

        // Salva o usuário na sessão
        (req.session as any).usuario = usuario.toJSON();
        res.redirect("/"); // Redireciona para a página inicial ou dashboard

    } catch (error: any) {
        res.status(500).render("login", { error: error.message });
    }
});

// Rota para exibir o formulário de registro
router.get("/register", (req, res) => {
    res.render("register", { error: req.query.error });
});

// Rota para processar o registro
router.post("/register", async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        await repository.criar({ nome, email, senha });
        res.redirect("/auth/login?success=Usuário registrado com sucesso! Faça login.");
    } catch (error: any) {
        res.status(400).render("register", { error: error.message, usuario: req.body });
    }
});

// Rota para fazer logout
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erro ao destruir a sessão:", err);
            return res.status(500).send("Erro ao fazer logout.");
        }
        res.redirect("/auth/login");
    });
});

export default router;
