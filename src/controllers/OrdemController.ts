import { Router } from "express";
import { OrdemRepository } from "../models/OrdemRepository";

const router = Router();
const repository = new OrdemRepository();

router.get("/", async (req, res) => {
    const ordens = await repository.listar();
    res.json(ordens);
});

router.get("/:id", async (req, res) => {
    const ordem = await repository.buscarPorId((req.params.id));

    if (!ordem) {
        return res.status(404).json({ mensagem: "Ordem não encontrada." });
    }

    res.json(ordem);
});

router.post("/", async (req, res) => {
    const ordem = await repository.criar(req.body);
    res.status(201).json(ordem);
});

router.put("/:id", async (req, res) => {
  const ordem = await repository.atualizar(
    req.params.id,
    req.body
);
    res.json(ordem);
});

router.delete("/:id", async (req, res) => {
    await repository.remover(req.params.id);
    res.sendStatus(204);
});

export default router;
