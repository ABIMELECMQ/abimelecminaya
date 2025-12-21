const db = require("../config/database");

//------------------------------buscarImpresoraPorCoincidencia-----------------------------

const buscarClientesPorCoincidencia = async (req, res) => {
  try {
    const { texto } = req.query;

    if (!texto) {
      return res.json({
        success: false,
        mensaje: "Debes enviar el parámetro ?texto=",
      });
    }

    const query = `
      SELECT * FROM impresora
      WHERE marca LIKE ? 
         OR modelo LIKE ?
         OR seria LIKE ?
      ORDER BY id DESC
    `;

    const [result] = await db.query(query, [
      `%${texto}%`,
      `%${texto}%`,
      `%${texto}%`,
    ]);

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      mensaje: "Error al buscar impresora",
      error: error.message,
    });
  }
};

module.exports = {
  buscarClientesPorCoincidencia,
};
