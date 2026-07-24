const express = require('express');
const app = express();
import clientesRoutes from "./routes/clientes";
import veiculosRoutes from "./routes/veiculos";
import ordensRoutes from "./routes/ordens";
import authRoutes from "./routes/auth";

app.use("/clientes", clientesRoutes);
app.use("/veiculos", veiculosRoutes);
app.use("/ordens", ordensRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
