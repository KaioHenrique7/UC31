import { Router } from "express";
import  UsuarioRepository  from "../models/UsuarioRepository";

const router = Router();
const repository = new UsuarioRepository();

// Rota para exibir o formulário de login
router.get("/login", (req, res) => {
    const error = req.query.error ? decodeURIComponent(String(req.query.error)) : null;
    res.render("login", { error });
});

// Rota para processar o login
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        if (!email || !senha) {
            return res.redirect("/auth/login?error=" + encodeURIComponent("E-mail e senha são obrigatórios."));
        }

        const usuario = await repository.login(email, senha);

        if (!usuario) {
            return res.redirect("/auth/login?error=" + encodeURIComponent("E-mail ou senha inválidos."));
        }

        // Salva o usuário na sessão (SEM a senha)
        (req.session as any).usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };

        res.redirect("/");

    } catch (error: any) {
        res.redirect("/auth/login?error=" + encodeURIComponent(error.message));
    }
});

// Rota para exibir o formulário de registro
router.get("/register", (req, res) => {
    const error = req.query.error ? decodeURIComponent(String(req.query.error)) : null;
    res.render("register", { error, usuario: {} });
});

// Rota para processar o registro
router.post("/register", async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        if (!nome || !email || !senha) {
            return res.status(400).render("register", { 
                error: "Nome, e-mail e senha são obrigatórios.", 
                usuario: req.body 
            });
        }

        await repository.criar({ nome, email, senha });
        res.redirect("/auth/login?success=" + encodeURIComponent("Usuário registrado com sucesso! Faça login."));

    } catch (error: any) {
        res.status(400).render("register", { 
            error: error.message, 
            usuario: req.body 
        });
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
