const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/auth.middleware");
const { soloAdmin } = require("../middleware/rol.middleware");
const {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarioController");

console.log("verificarToken:", typeof verificarToken);
console.log("soloAdmin:", typeof soloAdmin);
console.log("listarUsuarios:", typeof listarUsuarios);

// SOLO ADMIN SE LE PERMITE ACCEDER A ESTAS RUTAS Y REALIZAR ESTAS ACCIONES
router.get("/", verificarToken, soloAdmin, listarUsuarios);
router.post("/", verificarToken, soloAdmin, crearUsuario);
router.put("/:id", verificarToken, soloAdmin, actualizarUsuario);
router.delete("/:id", verificarToken, soloAdmin, eliminarUsuario);

module.exports = router;
