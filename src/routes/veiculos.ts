import { Router } from "express";
import { VeiculoRepository } from "../models/VeiculoRepository";

const router = Router();

const repository = new VeiculoRepository();


// ==========================================
// LISTAR VEÍCULOS
// ==========================================

router.get("/", async (req, res) => {

    try {

        const veiculos =
            await repository.listar();

        res.render(
            "veiculos/index",
            {
                veiculos
            }
        );

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao carregar veículos."
        );

    }

});


// ==========================================
// PÁGINA DE CADASTRO
// ==========================================

router.get("/cadastrar", (req, res) => {

    res.render(
        "veiculos/novo"
    );

});


// ==========================================
// DETALHES
// ==========================================

router.get("/:id", async (req, res) => {

    try {

        const veiculo =
            await repository.buscarPorId(
                req.params.id
            );

        if (!veiculo) {

            return res.status(404).send(
                "Veículo não encontrado."
            );

        }

        res.render(
            "veiculos/detalhes",
            {
                veiculo
            }
        );

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao buscar veículo."
        );

    }

});


// ==========================================
// CADASTRAR VEÍCULO
// ==========================================

router.post("/", async (req, res) => {

    try {

        await repository.criar({

            id: Date.now().toString(),

            placa: req.body.placa,

            modelo: req.body.modelo,

            marca: req.body.marca,

            ano: Number(req.body.ano),

            clienteId: req.body.clienteId || "",

            foto: req.body.foto || ""

        });

        res.redirect(
            "/veiculos"
        );

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao cadastrar veículo."
        );

    }

});


// ==========================================
// PÁGINA DE EDIÇÃO
// ==========================================

router.get("/:id/editar", async (req, res) => {

    try {

        const veiculo =
            await repository.buscarPorId(
                req.params.id
            );

        if (!veiculo) {

            return res.status(404).send(
                "Veículo não encontrado."
            );

        }

        res.render(
            "veiculos/editar",
            {
                veiculo
            }
        );

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao carregar veículo."
        );

    }

});


// ==========================================
// ATUALIZAR VEÍCULO
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        const veiculo =
            await repository.buscarPorId(
                req.params.id
            );

        if (!veiculo) {

            return res.status(404).send(
                "Veículo não encontrado."
            );

        }

        await repository.atualizar({

            id: req.params.id,

            placa: req.body.placa,

            modelo: req.body.modelo,

            marca: req.body.marca,

            ano: Number(req.body.ano),

            clienteId:
                req.body.clienteId || "",

            foto:
                req.body.foto || ""

        });

        res.redirect(
            "/veiculos"
        );

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao atualizar veículo."
        );

    }

});


// ==========================================
// EXCLUIR VEÍCULO
// ==========================================

router.delete("/:id", async (req, res) => {

    try {

        await repository.remover(
            req.params.id
        );

        res.redirect(
            "/veiculos"
        );

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao excluir veículo."
        );

    }

});


export default router;