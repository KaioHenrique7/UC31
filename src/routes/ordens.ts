import { Router } from "express";
import { OrdemRepository } from "../models/OrdemRepository";

const router = Router();
const repository = new OrdemRepository();


// =====================================================
// LISTAR ORDENS
// GET /ordens
// =====================================================

router.get("/", async (req, res) => {

    try {

        const ordens = await repository.listar();

        res.render("ordens/index", {
            ordens
        });

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao carregar ordens de serviço."
        );

    }

});


// =====================================================
// PÁGINA DE CADASTRO
// GET /ordens/cadastrar
// =====================================================

router.get("/cadastrar", (req, res) => {

    res.render("ordens/novo");

});


// =====================================================
// DETALHES DA ORDEM
// GET /ordens/:id
// =====================================================

router.get("/:id", async (req, res) => {

    try {

        const ordem = await repository.buscarPorId(
            req.params.id
        );

        if (!ordem) {

            return res.status(404).send(
                "Ordem de serviço não encontrada."
            );

        }

        res.render("ordens/detalhes", {
            ordem
        });

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao buscar ordem de serviço."
        );

    }

});


// =====================================================
// CADASTRAR ORDEM
// POST /ordens
// =====================================================

router.post("/", async (req, res) => {

    try {

        await repository.criar({

            veiculo: req.body.veiculo,

            descricao: req.body.descricao,

            valor: Number(req.body.valor),

            status: req.body.status

        });

        res.redirect("/ordens");

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao cadastrar ordem de serviço."
        );

    }

});


// =====================================================
// PÁGINA DE EDIÇÃO
// GET /ordens/:id/editar
// =====================================================

router.get("/:id/editar", async (req, res) => {

    try {

        const ordem = await repository.buscarPorId(
            req.params.id
        );

        if (!ordem) {

            return res.status(404).send(
                "Ordem de serviço não encontrada."
            );

        }

        res.render("ordens/editar", {
            ordem
        });

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao carregar edição da ordem."
        );

    }

});


// =====================================================
// ATUALIZAR ORDEM
// PUT /ordens/:id
// =====================================================

router.put("/:id", async (req, res) => {

    try {

        await repository.atualizar(

            req.params.id,

            {

                veiculo: req.body.veiculo,

                descricao: req.body.descricao,

                valor: Number(req.body.valor),

                status: req.body.status

            }

        );

        res.redirect("/ordens");

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao atualizar ordem de serviço."
        );

    }

});


// =====================================================
// EXCLUIR ORDEM
// DELETE /ordens/:id
// =====================================================

router.delete("/:id", async (req, res) => {

    try {

        await repository.remover(
            req.params.id
        );

        res.redirect("/ordens");

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Erro ao excluir ordem de serviço."
        );

    }

});


export default router;