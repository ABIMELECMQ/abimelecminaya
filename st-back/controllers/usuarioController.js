const db = require("../config/database");
const bcrypt = require("bcryptjs");

// LISTAR USUARIOS
const listarUsuarios = async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, nombre, password, rol, activo FROM usuario"
  );
  res.json({
    success: true,
    data: rows,
  });
};

// CREAR USUARIO
const crearUsuario = async (req, res) => {
  const { nombre, password, rol, activo } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO usuario (nombre, password, rol, activo) VALUES (?,?,?,?)",
    [nombre, hash, rol, activo ?? 1]
  );

  res.json({
    success: true,
    mensaje: "Usuario creado",
  });
};

// ACTUALIZAR USUARIO
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, password, rol, activo } = req.body;

  let hash = password;

  // 👉 Solo encripta si viene password nuevo
  if (password) {
    hash = await bcrypt.hash(password, 10);
  }

  await db.query(
    "UPDATE usuario SET nombre=?, password=?, rol=?, activo=? WHERE id=?",
    [nombre, hash, rol, activo, id]
  );

  res.json({
    success: true,
    mensaje: "Usuario actualizado",
  });
};

// ELIMINAR USUARIO
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM usuario WHERE id=?", [id]);

  res.json({
    success: true,
    mensaje: "Usuario eliminado",
  });
};

module.exports = {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
