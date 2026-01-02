const db = require("../config/database");

const Tecnico = {
  // LISTAR
  listar: async () => {
    const [rows] = await db.query("SELECT * FROM tecnico ORDER BY id DESC");
    return rows;
  },

  // CREAR
  crear: async (data) => {
    const { dni, nombres, apellidos, telefono, especialidad } = data;
    const [result] = await db.query(
      `INSERT INTO tecnico (dni, nombres, apellidos, telefono, especialidad)
       VALUES (?, ?, ?, ?, ?)`,
      [dni, nombres, apellidos, telefono, especialidad]
    );
    return result.insertId;
  },

  // ACTUALIZAR
  actualizar: async (id, data) => {
    const { dni, nombres, apellidos, telefono, especialidad } = data;
    const [result] = await db.query(
      `UPDATE tecnico
       SET dni=?, nombres=?, apellidos=?, telefono=?, especialidad=?
       WHERE id=?`,
      [dni, nombres, apellidos, telefono, especialidad, id]
    );
    return result.affectedRows;
  },

  // ELIMINAR
  eliminar: async (id) => {
    const [result] = await db.query("DELETE FROM tecnico WHERE id=?", [id]);
    return result.affectedRows;
  },
};

module.exports = Tecnico;
