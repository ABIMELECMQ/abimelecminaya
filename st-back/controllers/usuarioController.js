const db = require("../config/database");
const bcrypt = require("bcryptjs");

// LISTAR USUARIOS
const listarUsuarios = async (req, res) => {
  const [rows] = await db.query("SELECT id, usuario, rol FROM usuarios");
  res.json({
    success: true,
    data: rows,
  });
};

// CREAR USUARIO
const crearUsuario = async (req, res) => {
  const { usuario, password, rol } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO usuarios (usuario, password, rol) VALUES (?,?,?)",
    [usuario, hash, rol]
  );

  res.json({
    success: true,
    mensaje: "Usuario creado",
  });
};

// ACTUALIZAR USUARIO
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { usuario, rol } = req.body;

  await db.query("UPDATE usuarios SET usuario=?, rol=? WHERE id=?", [
    usuario,
    rol,
    id,
  ]);

  res.json({
    success: true,
    mensaje: "Usuario actualizado",
  });
};

// ELIMINAR USUARIO
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM usuarios WHERE id=?", [id]);

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
