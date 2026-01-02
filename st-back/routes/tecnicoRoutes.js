const express = require("express");
const router = express.Router();

const {
  listarTecnicos,
  crearTecnico,
  actualizarTecnico,
  eliminarTecnico,
} = require("../controllers/tecnicoController");

const verificarToken = require("../middleware/auth.middleware");
const { soloAdmin } = require("../middleware/rol.middleware");

// 🔒 LOGIN OBLIGATORIO
router.get("/", verificarToken, listarTecnicos);

// 🔒 SOLO ADMIN
router.post("/", verificarToken, soloAdmin, crearTecnico);
router.put("/:id", verificarToken, soloAdmin, actualizarTecnico);
router.delete("/:id", verificarToken, soloAdmin, eliminarTecnico);

module.exports = router;
