import { Router } from "express";
import UsuarioRepository from "../models/UsuarioRepository";

const router = Router();
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    const usuario = UsuarioRepository.login(email, senha);

    if (!usuario) {
        return res.status(401).json({
            mensagem: "E-mail ou senha inválidos."
        });
    }

    res.json({
        mensagem: "Login realizado com sucesso.",
        usuario
    });
});

export default router;