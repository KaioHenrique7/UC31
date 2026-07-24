import { Router } from "express";
import { VeiculoRepository } from "../models/VeiculoRepository";

const router = Router();
const repository = new VeiculoRepository();

router.get("/", async (req, res) => {
    const veiculos = repository.listar();
    res.json(veiculos);
});

router.get("/:id", async (req, res) => {
    const veiculo = repository.buscarPorId(req.params.id);

    if (!veiculo) {
        return res.status(404).json({ mensagem: "Veículo não encontrado." });
    }

    res.json(veiculo);
});

router.post("/", async (req, res) => {
    repository.criar(req.body);
    res.status(201).json(req.body);
});

router.put("/:id", async (req, res) => {
    const veiculoAtualizado = {
        ...req.body,
        id: req.params.id
    };

    repository.atualizar(veiculoAtualizado);

    res.json(veiculoAtualizado);
});

router.delete("/:id", async (req, res) => {
    repository.remover(req.params.id);
    res.sendStatus(204);
});

export default router;