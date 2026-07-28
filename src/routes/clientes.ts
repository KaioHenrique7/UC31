import { Router } from "express";
import { ClienteRepository } from "../models/ClienteRepository";

const router = Router();

const repository = new ClienteRepository();


// =====================================================
// LISTAR CLIENTES
// GET /clientes
// =====================================================

router.get("/", async (req, res) => {

    try {

        const clientes = await repository.listar();

        res.render("clientes/index", {
            clientes
        });

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao carregar clientes."
        );

    }

});


// =====================================================
// PÁGINA DE CADASTRO
// GET /clientes/cadastrar
// =====================================================

router.get("/cadastrar", (req, res) => {

    res.render("clientes/novo");

});


// =====================================================
// PÁGINA DE EDIÇÃO
// GET /clientes/:id/editar
// =====================================================

router.get("/:id/editar", async (req, res) => {

    try {

        const cliente = await repository.buscarPorId(
            req.params.id
        );

        if (!cliente) {

            return res.status(404).send(
                "Cliente não encontrado."
            );

        }

        res.render("clientes/editar", {
            cliente
        });

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao carregar cliente."
        );

    }

});


// =====================================================
// DETALHES DO CLIENTE
// GET /clientes/:id
// =====================================================

router.get("/:id", async (req, res) => {

    try {

        const cliente = await repository.buscarPorId(
            req.params.id
        );

        if (!cliente) {

            return res.status(404).send(
                "Cliente não encontrado."
            );

        }

        res.render("clientes/detalhes", {
            cliente
        });

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao buscar cliente."
        );

    }

});


// =====================================================
// CADASTRAR CLIENTE
// POST /clientes
// =====================================================

router.post("/", async (req, res) => {

    try {

        await repository.criar({

            nome: req.body.nome,

            telefone: req.body.telefone,

            email: req.body.email

        });

        res.redirect("/clientes");

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao cadastrar cliente."
        );

    }

});


// =====================================================
// ATUALIZAR CLIENTE
// PUT /clientes/:id
// =====================================================

router.put("/:id", async (req, res) => {

    try {

        await repository.atualizar(

            req.params.id,

            {

                nome: req.body.nome,

                telefone: req.body.telefone,

                email: req.body.email

            }

        );

        res.redirect("/clientes");

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao atualizar cliente."
        );

    }

});


// =====================================================
// EXCLUIR CLIENTE
// DELETE /clientes/:id
// =====================================================

router.delete("/:id", async (req, res) => {

    try {

        await repository.remover(
            req.params.id
        );

        res.redirect("/clientes");

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao excluir cliente."
        );

    }

});


export default router;