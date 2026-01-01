const express = require("express");
const router = express.Router();

const { verificarToken } = require("../middleware/auth.middleware");
const { soloAdmin } = require("../middleware/rol.middleware");

router.get("/usuarios", verificarToken, soloAdmin, (req, res) => {
  res.json({
    success: true,
    mensaje: "Accediste como ADMIN",
    usuario: req.usuario,
  });
});

module.exports = router;
