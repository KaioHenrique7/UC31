import { Router } from "express";
import { VeiculoRepository } from "../models/VeiculoRepository";
import { Veiculo } from "../entities/veiculos";

const router = Router();
const repository = new VeiculoRepository();

// GET /veiculos - Listar todos os veículos
router.get("/", async (req, res) => {
    try {
        const veiculos = await repository.listar();
        res.render("veiculos/index", { veiculos });
    } catch (error: any) {
        res.status(500).render("error", { message: error.message });
    }
});

// GET /veiculos/novo - Exibir formulário de novo veículo
router.get("/novo", (req, res) => {
    res.render("veiculos/novo", { error: null, veiculo: {} });
});

// GET /veiculos/:id - Exibir detalhes de um veículo
router.get("/:id", async (req, res) => {
    try {
        const veiculo = await repository.buscarPorId(req.params.id);
        if (!veiculo) {
            return res.status(404).render("error", { message: "Veículo não encontrado." });
        }
        res.render("veiculos/detalhes", { veiculo });
    } catch (error: any) {
        res.status(500).render("error", { message: error.message });
    }
});

// GET /veiculos/:id/editar - Exibir formulário de edição
router.get("/:id/editar", async (req, res) => {
    try {
        const veiculo = await repository.buscarPorId(req.params.id);
        if (!veiculo) {
            return res.status(404).render("error", { message: "Veículo não encontrado." });
        }
        res.render("veiculos/editar", { veiculo, error: null });
    } catch (error: any) {
        res.status(500).render("error", { message: error.message });
    }
});

// POST /veiculos - Criar novo veículo
router.post("/", async (req, res) => {
    try {
        const { placa, modelo, marca, ano, clienteId, foto } = req.body;
        
        // Validação básica no controller
        if (!placa || !modelo || !marca || !ano || !clienteId || !foto) {
            return res.status(400).render("veiculos/novo", { 
                error: "Todos os campos são obrigatórios.", 
                veiculo: req.body 
            });
        }

        const novoVeiculo = await repository.criar({ 
            placa, 
            modelo, 
            marca, 
            ano: Number(ano), 
            clienteId, 
            foto 
        });
        res.redirect("/veiculos");
    } catch (error: any) {
        res.status(400).render("veiculos/novo", { 
            error: error.message, 
            veiculo: req.body 
        });
    }
});

// PUT /veiculos/:id - Atualizar veículo
router.put("/:id", async (req, res) => {
    try {
        const { placa, modelo, marca, ano, clienteId, foto } = req.body;
        
        // Validação básica no controller
        if (!placa || !modelo || !marca || !ano || !clienteId || !foto) {
            const veiculo = await repository.buscarPorId(req.params.id);
            return res.status(400).render("veiculos/editar", { 
                error: "Todos os campos são obrigatórios.", 
                veiculo: veiculo || req.body 
            });
        }

        await repository.atualizar(req.params.id, { 
            placa, 
            modelo, 
            marca, 
            ano: Number(ano), 
            clienteId, 
            foto 
        });
        res.redirect("/veiculos");
    } catch (error: any) {
        const veiculo = await repository.buscarPorId(req.params.id);
        res.status(400).render("veiculos/editar", { 
            error: error.message, 
            veiculo: veiculo || { id: req.params.id, ...req.body } 
        });
    }
});

// DELETE /veiculos/:id - Remover veículo
router.delete("/:id", async (req, res) => {
    try {
        await repository.remover(req.params.id);
        res.sendStatus(204);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
