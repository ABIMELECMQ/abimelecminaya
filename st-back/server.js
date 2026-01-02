require("dotenv").config();
const express = require("express");
const cors = require("cors");

const clientesRoutes = require("./routes/clienteRoutes"); // Rutas de clientes
const tecnicoRoutes = require("./routes/tecnicoRoutes"); // Rutas de técnicos

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", require("./routes/authRoutes")); // Rutas de autenticación
app.use("/api/usuarios", require("./routes/usuarioRoutes")); // Rutas de usuarios
app.use("/api/impresoras", require("./routes/impresoraRoutes")); // Rutas de impresoras

app.use("/api/tecnicos", tecnicoRoutes); // Rutas de técnicos

app.use("/api/clientes", clientesRoutes); // Rutas de clientes

app.get("/", (req, res) => {
  res.json({
    mensaje: "API de Servicio Técnico funcionando correctamente",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor inicializado en el http://localhost:${PORT}`);
});
