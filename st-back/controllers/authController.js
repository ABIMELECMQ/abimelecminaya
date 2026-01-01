const Usuario = require("../models/usuario.model");
const { hashPassword, comparePassword } = require("../utils/password");
const jwt = require("jsonwebtoken");

// ========== REGISTRO ==========
const registrarUsuario = async (req, res) => {
  try {
    let { nombre, password, rol } = req.body;
    if (!rol) rol = "usuario";

    const passwordHash = await hashPassword(password);

    const idUsuario = await Usuario.crearUsuario({
      nombre,
      password: passwordHash,
      rol,
    });

    res.status(201).json({
      success: true,
      mensaje: "Usuario registrado correctamente",
      idUsuario,
    });
  } catch (error) {
    console.error("ERROR REGISTRO:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al registrar usuario",
    });
  }
};

// ========== LOGIN ==========
const login = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    const usuario = await Usuario.buscarPorNombre(nombre);
    if (!usuario) {
      return res.status(401).json({
        success: false,
        mensaje: "Usuario o contraseña incorrectos",
      });
    }

    const valido = await comparePassword(password, usuario.password);
    if (!valido) {
      return res.status(401).json({
        success: false,
        mensaje: "Usuario o contraseña incorrectos",
      });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    await Usuario.actualizarUltimaConexion(usuario.id);

    res.json({
      success: true,
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("ERROR LOGIN:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error en el login",
    });
  }
};

module.exports = {
  registrarUsuario,
  login, // 👈 MUY IMPORTANTE
};
