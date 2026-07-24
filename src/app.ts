import express from "express";

import clientesRoutes from "./routes/clientes";
import veiculosRoutes from "./routes/veiculos";
import ordensRoutes from "./routes/ordens";
import authRoutes from "./routes/auth";




const app = express();


// Permite receber JSON no corpo das requisições
app.use(express.json());


// Rotas
app.use("/clientes", clientesRoutes);
app.use("/veiculos", veiculosRoutes);
app.use("/ordens", ordensRoutes);
app.use("/auth", authRoutes);

export default app;