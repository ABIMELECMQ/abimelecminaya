const express = require("express");
const router = express.Router();

const { registrarUsuario, login } = require("../controllers/authController");

router.post("/register", registrarUsuario);
router.post("/login", login);

module.exports = router;
