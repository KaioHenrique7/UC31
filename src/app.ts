import express from "express";
import path from "path";
import methodOverride from "method-override";

import sessionconfing from "./confing/session";
import auth from "./middlewares/auth";

import clientesRoutes from "./routes/clientes";
import veiculosRoutes from "./routes/veiculos";
import ordensRoutes from "./routes/ordens";
import authRoutes from "./routes/auth";


const app = express();


// ==========================================
// METHOD OVERRIDE
// Permite PUT e DELETE pelos formulários HTML
// ==========================================

app.use(methodOverride("_method"));


// ==========================================
// EJS
// ==========================================

app.set(
    "view engine",
    "ejs"
);

app.set(
    "views",
    path.join(__dirname, "views")
);


// ==========================================
// RECEBER DADOS DOS FORMULÁRIOS
// ==========================================

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    express.json()
);


// ==========================================
// SESSÃO
// ==========================================

app.use(sessionconfing);


// ==========================================
// ARQUIVOS PÚBLICOS
// ==========================================

app.use(
    express.static(
        path.join(__dirname, "../public")
    )
);


// ==========================================
// UPLOADS
// ==========================================

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "../uploads")
    )
);


// ==========================================
// ROTAS PÚBLICAS (sem autenticação)
// ==========================================

app.use("/auth", authRoutes);


// ==========================================
// PÁGINA INICIAL
// ==========================================

app.get("/", (req, res) => {
    res.render("home");
});


// ==========================================
// MIDDLEWARE DE AUTENTICAÇÃO
// Todas as rotas abaixo requerem login
// ==========================================

app.use(auth);


// ==========================================
// ROTAS PROTEGIDAS (com autenticação)
// ==========================================

app.use(
    "/clientes",
    clientesRoutes
);

app.use(
    "/veiculos",
    veiculosRoutes
);

app.use(
    "/ordens",
    ordensRoutes
);


export default app;
