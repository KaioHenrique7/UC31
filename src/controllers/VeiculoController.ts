import { Router } from "express";
import { VeiculoRepository } from "../models/VeiculoRepository";

const router = Router();
const repository = new VeiculoRepository();

router.get("/", async (req, res) => {
    const veiculos = await repository.listar();
    res.json(veiculos);
});

router.get("/:id", async (req, res) => {
    const veiculo = await repository.buscarPorId((req.params.id));

    if (!veiculo) {
        return res.status(404).json({ mensagem: "Veículo não encontrado." });
    }

    res.json(veiculo);
});

router.post("/", async (req, res) => {
    const veiculo = await repository.criar(req.body);
    res.status(201).json(veiculo);
});

router.put("/:id", async (req, res) => {
    const Veiculo = await repository.atualizar(req.body);
    res.json(Veiculo);
});

router.delete("/:id", async (req, res) => {
    await repository.remover((req.params.id));
    res.sendStatus(204);
});

export default router;
