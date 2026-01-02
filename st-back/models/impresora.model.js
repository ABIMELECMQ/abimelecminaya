const pool = require("../config/database");

// LISTAR TODAS
const listarImpresoras = async () => {
  const [rows] = await pool.query(`
    SELECT i.id, i.marca, i.modelo, i.serie, i.creado_en,
           c.id AS cliente_id, c.nombre AS cliente
    FROM impresora i
    INNER JOIN cliente c ON i.cliente_id = c.id
    ORDER BY i.id DESC
  `);
  return rows;
};

// CREAR IMPRESORA
const crearImpresora = async ({ marca, modelo, serie, cliente_id }) => {
  const [result] = await pool.query(
    `INSERT INTO impresora (marca, modelo, serie, cliente_id)
     VALUES (?, ?, ?, ?)`,
    [marca, modelo, serie, cliente_id]
  );
  return result.insertId;
};

// ACTUALIZAR IMPRESORA
const actualizarImpresora = async (
  id,
  { marca, modelo, serie, cliente_id }
) => {
  const [result] = await pool.query(
    `UPDATE impresora
     SET marca = ?, modelo = ?, serie = ?, cliente_id = ?
     WHERE id = ?`,
    [marca, modelo, serie, cliente_id, id]
  );
  return result.affectedRows;
};

// ELIMINAR
const eliminarImpresora = async (id) => {
  const [result] = await pool.query("DELETE FROM impresora WHERE id = ?", [id]);
  return result.affectedRows;
};

module.exports = {
  listarImpresoras,
  crearImpresora,
  actualizarImpresora,
  eliminarImpresora,
};
