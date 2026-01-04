const db = require("../config/database");

// ================== LISTAR ESTADOS DE ORDEN ==================
const listarEstadosOrden = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nombre, descripcion FROM estado_orden ORDER BY id ASC"
    );

    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: "Error al listar estados",
      error: error.message,
    });
  }
};

module.exports = {
  listarEstadosOrden,
};
