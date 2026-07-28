import { Router } from "express";
import { ClienteRepository } from "../models/ClienteRepository";
import { VeiculoRepository } from "../models/VeiculoRepository";

const router = Router();
const repository = new ClienteRepository();
const veiculoRepository = new VeiculoRepository;


// Página com todos os clientes
router.get("/", async (req, res) => {

    const clientes = await repository.listar();
    const veiculos = await veiculoRepository.listar();

    res.render("clientes/index", {
        clientes,
        veiculos
    });

});


// Página de cadastro
router.get("/cadastrar", (req, res) => {
    res.render("clientes/cadastrar");
});


// Buscar cliente por ID
router.get("/:id", async (req, res) => {

    const cliente = await repository.buscarPorId(req.params.id);

    if (!cliente) {
        return res.status(404).json({
            mensagem: "Cliente não encontrado"
        });
    }

    res.json(cliente);
});


// Criar cliente
router.post("/", async (req, res) => {

    try {

        await repository.criar(req.body);

        res.redirect("/clientes");

    } catch (error) {

        res.status(500).json({
            mensagem: "Erro ao cadastrar cliente"
        });

    }

});


// Atualizar cliente
router.put("/:id", async (req, res) => {

    try {

        const cliente = await repository.atualizar(
            req.params.id,
            req.body
        );

        res.json(cliente);


    } catch(error){

        res.status(500).json({
            mensagem:"Erro ao atualizar cliente"
        });

    }

});


// Excluir cliente
router.delete("/:id", async (req, res)=>{

    try {

        await repository.remover(req.params.id);

        res.sendStatus(204);


    } catch(error){

        res.status(500).json({
            mensagem:"Erro ao remover cliente"
        });

    }

});


export default router;