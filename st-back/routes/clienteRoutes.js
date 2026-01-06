const express = require("express");
const router = express.Router();

const {
  listarClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  buscarClientesPorCoincidencia,
  buscarClientesConImpresoras,
  obtenerClientePorId,
} = require("../controllers/clienteController");

const verificarToken = require("../middleware/auth.middleware");
const { soloAdmin, adminOTecnico } = require("../middleware/rol.middleware");

// 🔍 BÚSQUEDAS (SIEMPRE PRIMERO)
router.get("/buscar", verificarToken, buscarClientesPorCoincidencia);

router.get(
  "/buscar-con-impresoras",
  verificarToken,
  buscarClientesConImpresoras
);

// LISTAR
router.get("/", verificarToken, listarClientes);

// OBTENER POR ID esto siempre va al final
router.get("/:id", verificarToken, obtenerClientePorId);

// ADMIN y TECNICO
router.post("/", verificarToken, adminOTecnico, crearCliente);
router.put("/:id", verificarToken, adminOTecnico, actualizarCliente);

// SOLO ADMIN
router.delete("/:id", verificarToken, soloAdmin, eliminarCliente);

module.exports = router;
