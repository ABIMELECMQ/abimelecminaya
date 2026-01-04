const express = require("express");
const router = express.Router();

const { listarEstadosOrden } = require("../controllers/estadoOrdenController");

const verificarToken = require("../middleware/auth.middleware");

// 🔒 SOLO USUARIOS AUTENTICADOS
router.get("/", verificarToken, listarEstadosOrden);

module.exports = router;
