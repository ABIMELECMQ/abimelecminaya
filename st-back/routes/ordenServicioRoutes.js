const express = require("express");
const router = express.Router();

const {
  crearOrden,
  listarOrdenes,
  obtenerOrdenPorId,
  actualizarEstadoOrden,
} = require("../controllers/ordenServicioController");

const verificarToken = require("../middleware/auth.middleware");

// 🔒 LOGIN OBLIGATORIO
router.post("/", verificarToken, crearOrden);
router.get("/", verificarToken, listarOrdenes);
router.get("/:id", verificarToken, obtenerOrdenPorId);
router.put("/:id/estado", verificarToken, actualizarEstadoOrden);

module.exports = router;
