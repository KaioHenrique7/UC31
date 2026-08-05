import express from "express";
import path from "path";
import methodOverride from "method-override";

import sessionConfig from "./confing/session";
import auth from "./middlewares/auth";

import authRoutes from "./controllers/AuthController";  // ← ADICIONE ESTA LINHA
import clientesRoutes from "./routes/clientes";
import veiculosRoutes from "./routes/veiculos";
import ordensRoutes from "./routes/ordens";

const app = express();

// ==========================================
// METHOD OVERRIDE
// ==========================================
app.use(methodOverride("_method"));

// ==========================================
// EJS
// ==========================================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ==========================================
// STATIC FILES
// ==========================================
app.use(express.static(path.join(__dirname, "../public")));

// ==========================================
// BODY PARSER
// ==========================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==========================================
// SESSION
// ==========================================
app.use(sessionConfig);

// ==========================================
// ROTAS PÚBLICAS (SEM AUTENTICAÇÃO)
// ==========================================

// Rota de autenticação (login, register, logout)
app.use("/auth", authRoutes);

// Página inicial (sem autenticação por enquanto)
app.get("/", (req, res) => {
    if ((req.session as any).usuario) {
        res.render("home");
    } else {
        res.redirect("/auth/login");
    }
});

// ==========================================
// MIDDLEWARE DE AUTENTICAÇÃO
// ==========================================
app.use(auth);

// ==========================================
// ROTAS PROTEGIDAS (COM AUTENTICAÇÃO)
// ==========================================

app.use("/clientes", clientesRoutes);
app.use("/veiculos", veiculosRoutes);
app.use("/ordens", ordensRoutes);

export default app;
