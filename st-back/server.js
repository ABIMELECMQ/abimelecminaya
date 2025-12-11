require("dotenv").config();
const express = require("express");
const cors = require("cors");

//const clientesRoutes = require("./routes/clientesRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use("/api/clientes", clientesRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API BIBLIOTECA - CRUD",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor inicializado en el http://localhost:${PORT}`);
});
