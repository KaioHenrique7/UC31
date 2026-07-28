import express from "express";
import path from "path";

import sessionConfig from "./confing/session";

import clientesRoutes from "./routes/clientes";
import veiculosRoutes from "./routes/veiculos";
import ordensRoutes from "./routes/ordens";
import authRoutes from "./routes/auth";

const app = express();

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessão
app.use(sessionConfig);

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rotas
app.use("/clientes", clientesRoutes);
app.use("/veiculos", veiculosRoutes);
app.use("/ordens", ordensRoutes);
app.use("/auth", authRoutes);

// Página inicial
app.get("/", (req, res) => {
    res.render("home");
});

export default app;