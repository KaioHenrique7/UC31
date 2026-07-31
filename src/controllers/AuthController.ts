import { Router } from "express";
import repository from "../models/UsuarioRepository";

const router = Router();

router.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const usuario = repository.login(email, senha);

    if (!usuario) {
        return res.status(401).json({
            mensagem: "E-mail ou senha inválidos."
        });
    }

    return res.json({
        mensagem: "Login realizado com sucesso.",
        usuario
    });
});

export default router;