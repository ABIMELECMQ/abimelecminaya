const express = require("express");
const router = express.Router();

const {
  crearOrden,
  listarOrdenes,
  obtenerOrdenPorId,
  actualizarEstadoOrden,
  listarOrdenesTaller,
} = require("../controllers/ordenServicioController");

const verificarToken = require("../middleware/auth.middleware");
const { soloAdmin, adminOTecnico } = require("../middleware/rol.middleware");

// 🔒 ÓRDENES
router.post("/", verificarToken, crearOrden); // Crear orden
router.get("/", verificarToken, listarOrdenes); // Listar órdenes

// 🔧 ÓRDENES EN TALLER (ANTES DEL :id)
router.get("/taller", verificarToken, adminOTecnico, listarOrdenesTaller);

// 🔍 ÓRDENES POR ID
router.get("/:id", verificarToken, obtenerOrdenPorId);
router.put("/:id/estado", verificarToken, actualizarEstadoOrden);

module.exports = router;
