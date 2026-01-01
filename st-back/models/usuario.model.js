const pool = require("../config/database");

// Crear usuario (REGISTRO)
const crearUsuario = async ({ nombre, password, rol }) => {
  const [result] = await pool.query(
    `INSERT INTO usuario (nombre, password, rol)
     VALUES (?, ?, ?)`,
    [nombre, password, rol]
  );

  return result.insertId;
};

// Buscar usuario por nombre (LOGIN)
const buscarPorNombre = async (nombre) => {
  const [rows] = await pool.query(
    `SELECT * FROM usuario
     WHERE nombre = ? AND activo = 1`,
    [nombre]
  );

  return rows[0];
};

// Actualizar última conexión
const actualizarUltimaConexion = async (id) => {
  await pool.query(
    `UPDATE usuario
     SET ultima_conexion = NOW()
     WHERE id = ?`,
    [id]
  );
};

module.exports = {
  crearUsuario,
  buscarPorNombre,
  actualizarUltimaConexion,
};
