import { Router } from "express";
import { VeiculoRepository } from "../models/VeiculoRepository";

const router = Router();
const repository = new VeiculoRepository();

// Lista os veículos
router.get("/", (req, res) => {
    const veiculos = repository.listar();

    res.render("veiculos/index", {
        veiculos
    });
});

// Formulário de novo veículo
router.get("/novo", (req, res) => {
    res.render("veiculos/novo");
});

// Formulário de edição
router.get("/:id/editar", (req, res) => {
    const veiculo = repository.buscarPorId(req.params.id);

    if (!veiculo) {
        return res.status(404).send("Veículo não encontrado.");
    }

    res.render("veiculos/editar", {
        veiculo
    });
});

// Detalhes
router.get("/:id", (req, res) => {
    const veiculo = repository.buscarPorId(req.params.id);

    if (!veiculo) {
        return res.status(404).send("Veículo não encontrado.");
    }

    res.render("veiculos/detalhes", {
        veiculo
    });
});

// Criar
router.post("/", (req, res) => {
    repository.criar(req.body);

    res.redirect("/veiculos");
});

// Atualizar
router.put("/:id", (req, res) => {
    const veiculoAtualizado = {
        ...req.body,
        id: req.params.id
    };

    repository.atualizar(veiculoAtualizado);

    res.redirect("/veiculos");
});

// Excluir
router.delete("/:id", (req, res) => {
    repository.remover(req.params.id);

    res.sendStatus(204);
});

export default router;