import { Router } from "express";
import { OrdemRepository } from "../models/OrdemRepository";

const router = Router();
const repository = new OrdemRepository();

// Lista as ordens
router.get("/", (req, res) => {
    const ordens = repository.listar();

    res.render("ordens/index", {
        ordens
    });
});

// Formulário de nova ordem
router.get("/novo", (req, res) => {
    res.render("ordens/novo");
});

// Formulário de edição
router.get("/:id/editar", (req, res) => {
    const ordem = repository.buscarPorId(req.params.id);

    if (!ordem) {
        return res.status(404).send("Ordem não encontrada.");
    }

    res.render("ordens/editar", {
        ordem
    });
});

// Detalhes
router.get("/:id", (req, res) => {
    const ordem = repository.buscarPorId(req.params.id);

    if (!ordem) {
        return res.status(404).send("Ordem não encontrada.");
    }

    res.render("ordens/detalhes", {
        ordem
    });
});

// Criar
router.post("/", (req, res) => {
    repository.criar(req.body);

    res.redirect("/ordens");
});

// Atualizar
router.put("/:id", (req, res) => {
    const ordemAtualizada = {
        ...req.body,
        id: req.params.id
    };

    repository.atualizar(ordemAtualizada);

    res.redirect("/ordens");
});

// Excluir
router.delete("/:id", (req, res) => {
    repository.remover(req.params.id);

    res.sendStatus(204);
});

export default router;