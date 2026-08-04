import { Router } from "express";
import { ClienteRepository } from "../models/ClienteRepository";
import { Cliente } from "../entities/Cliente";

const router = Router();
const repository = new ClienteRepository();

// GET /clientes - Listar todos os clientes
router.get("/", async (req, res) => {
    try {
        const clientes = await repository.listar();
        res.render("clientes/index", { clientes });
    } catch (error: any) {
        res.status(500).render("error", { message: error.message });
    }
});

// GET /clientes/novo - Exibir formulário de novo cliente
router.get("/novo", (req, res) => {
    res.render("clientes/novo", { error: null, cliente: {} });
});

// GET /clientes/:id - Exibir detalhes de um cliente
router.get("/:id", async (req, res) => {
    try {
        const cliente = await repository.buscarPorId(req.params.id);
        if (!cliente) {
            return res.status(404).render("error", { message: "Cliente não encontrado." });
        }
        res.render("clientes/detalhes", { cliente });
    } catch (error: any) {
        res.status(500).render("error", { message: error.message });
    }
});

// GET /clientes/:id/editar - Exibir formulário de edição
router.get("/:id/editar", async (req, res) => {
    try {
        const cliente = await repository.buscarPorId(req.params.id);
        if (!cliente) {
            return res.status(404).render("error", { message: "Cliente não encontrado." });
        }
        res.render("clientes/editar", { cliente, error: null });
    } catch (error: any) {
        res.status(500).render("error", { message: error.message });
    }
});

// POST /clientes - Criar novo cliente
router.post("/", async (req, res) => {
    try {
        const { nome, telefone, email } = req.body;
        
        // Validação básica no controller
        if (!nome || !telefone || !email) {
            return res.status(400).render("clientes/novo", { 
                error: "Todos os campos são obrigatórios.", 
                cliente: req.body 
            });
        }

        const novoCliente = await repository.criar({ nome, telefone, email });
        res.redirect("/clientes");
    } catch (error: any) {
        res.status(400).render("clientes/novo", { 
            error: error.message, 
            cliente: req.body 
        });
    }
});

// PUT /clientes/:id - Atualizar cliente
router.put("/:id", async (req, res) => {
    try {
        const { nome, telefone, email } = req.body;
        
        // Validação básica no controller
        if (!nome || !telefone || !email) {
            const cliente = await repository.buscarPorId(req.params.id);
            return res.status(400).render("clientes/editar", { 
                error: "Todos os campos são obrigatórios.", 
                cliente: cliente || req.body 
            });
        }

        await repository.atualizar(req.params.id, { nome, telefone, email });
        res.redirect("/clientes");
    } catch (error: any) {
        const cliente = await repository.buscarPorId(req.params.id);
        res.status(400).render("clientes/editar", { 
            error: error.message, 
            cliente: cliente || { id: req.params.id, ...req.body } 
        });
    }
});

// DELETE /clientes/:id - Remover cliente
router.delete("/:id", async (req, res) => {
    try {
        await repository.remover(req.params.id);
        res.sendStatus(204);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
