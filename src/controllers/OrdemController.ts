import { Router } from "express";
import { OrdemRepository } from "../models/OrdemRepository";
import { OrdemServico } from "../entities/OrdemServico";

const router = Router();
const repository = new OrdemRepository();

// GET /ordens - Listar todas as ordens de serviço
router.get("/", async (req, res) => {
    try {
        const ordens = await repository.listar();
        res.render("ordens/index", { ordens });
    } catch (error: any) {
        res.status(500).render("error", { message: error.message });
    }
});

// GET /ordens/novo - Exibir formulário de nova ordem
router.get("/novo", (req, res) => {
    res.render("ordens/novo", { error: null, ordem: {} });
});

// GET /ordens/:id - Exibir detalhes de uma ordem
router.get("/:id", async (req, res) => {
    try {
        const ordem = await repository.buscarPorId(req.params.id);
        if (!ordem) {
            return res.status(404).render("error", { message: "Ordem de Serviço não encontrada." });
        }
        res.render("ordens/detalhes", { ordem });
    } catch (error: any) {
        res.status(500).render("error", { message: error.message });
    }
});

// GET /ordens/:id/editar - Exibir formulário de edição
router.get("/:id/editar", async (req, res) => {
    try {
        const ordem = await repository.buscarPorId(req.params.id);
        if (!ordem) {
            return res.status(404).render("error", { message: "Ordem de Serviço não encontrada." });
        }
        res.render("ordens/editar", { ordem, error: null });
    } catch (error: any) {
        res.status(500).render("error", { message: error.message });
    }
});

// POST /ordens - Criar nova ordem de serviço
router.post("/", async (req, res) => {
    try {
        const { veiculo, descricao, valor, status } = req.body;
        
        // Validação básica no controller
        if (!veiculo || !descricao || !valor || !status) {
            return res.status(400).render("ordens/novo", { 
                error: "Todos os campos são obrigatórios.", 
                ordem: req.body 
            });
        }

        const novaOrdem = await repository.criar({ 
            veiculo, 
            descricao, 
            valor: Number(valor), 
            status 
        });
        res.redirect("/ordens");
    } catch (error: any) {
        res.status(400).render("ordens/novo", { 
            error: error.message, 
            ordem: req.body 
        });
    }
});

// PUT /ordens/:id - Atualizar ordem de serviço
router.put("/:id", async (req, res) => {
    try {
        const { veiculo, descricao, valor, status } = req.body;
        
        // Validação básica no controller
        if (!veiculo || !descricao || !valor || !status) {
            const ordem = await repository.buscarPorId(req.params.id);
            return res.status(400).render("ordens/editar", { 
                error: "Todos os campos são obrigatórios.", 
                ordem: ordem || req.body 
            });
        }

        await repository.atualizar(req.params.id, { 
            veiculo, 
            descricao, 
            valor: Number(valor), 
            status 
        });
        res.redirect("/ordens");
    } catch (error: any) {
        const ordem = await repository.buscarPorId(req.params.id);
        res.status(400).render("ordens/editar", { 
            error: error.message, 
            ordem: ordem || { id: req.params.id, ...req.body } 
        });
    }
});

// DELETE /ordens/:id - Remover ordem de serviço
router.delete("/:id", async (req, res) => {
    try {
        await repository.remover(req.params.id);
        res.sendStatus(204);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
