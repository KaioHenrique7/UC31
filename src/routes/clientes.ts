import { Router } from "express";
import { ClienteRepository } from "../models/ClienteRepository";

const router = Router();
const repository = new ClienteRepository();

router.get("/", async (req, res) => {
    const clientes = await repository.listar();
    res.json(clientes);
});

router.get("/:id", async (req, res) => {
    const cliente = await repository.buscarPorId(Number(req.params.id));

    if (!cliente) {
        return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    res.json(cliente);
});

router.post("/", async (req, res) => {
    const cliente = await repository.criar(req.body);
    res.status(201).json(cliente);
});

router.put("/:id", async (req, res) => {
    const cliente = await repository.atualizar(Number(req.params.id), req.body);
    res.json(cliente);
});

router.delete("/:id", async (req, res) => {
    await repository.remover(Number(req.params.id));
    res.sendStatus(204);
})
export default router; 