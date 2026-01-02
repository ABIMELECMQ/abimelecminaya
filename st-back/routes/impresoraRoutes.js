const express = require("express");
const router = express.Router();

const {
  listarImpresoras,
  crearImpresora,
  actualizarImpresora,
  eliminarImpresora,
} = require("../controllers/impresoraController");

const verificarToken = require("../middleware/auth.middleware");
const { soloAdmin, adminOTecnico } = require("../middleware/rol.middleware");

// 🔒 LOGIN
router.get("/", verificarToken, listarImpresoras);

// 🔒 ADMIN y TECNICO
router.post("/", verificarToken, adminOTecnico, crearImpresora);
router.put("/:id", verificarToken, adminOTecnico, actualizarImpresora);

// 🔒 SOLO ADMIN
router.delete("/:id", verificarToken, soloAdmin, eliminarImpresora);

module.exports = router;
