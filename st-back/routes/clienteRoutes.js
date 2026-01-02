const express = require("express");
const router = express.Router();

const {
  listarClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  buscarClientesPorCoincidencia,
  buscarClientesConImpresoras,
} = require("../controllers/clienteController");

const verificarToken = require("../middleware/auth.middleware");
const { soloAdmin, adminOTecnico } = require("../middleware/rol.middleware");

// 🔒 LOGIN OBLIGATORIO
router.get("/", verificarToken, listarClientes);

// 🔒 ADMIN y TECNICO
router.post("/", verificarToken, adminOTecnico, crearCliente);

router.put("/:id", verificarToken, adminOTecnico, actualizarCliente);

// 🔒 SOLO ADMIN
router.delete("/:id", verificarToken, soloAdmin, eliminarCliente);

// 🔍 BÚSQUEDAS
router.get("/buscar", verificarToken, buscarClientesPorCoincidencia);

router.get(
  "/buscar-con-impresoras",
  verificarToken,
  buscarClientesConImpresoras
);

module.exports = router;
