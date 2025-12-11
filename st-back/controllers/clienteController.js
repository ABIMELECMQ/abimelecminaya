/*const db = require("../config/database");

//-----------------------------listarclientes---------------------------

const listarClientes = async (req, res) => {
  try {
    const [cliente] = await db.query("SELECT * FROM cliente ORDER BY id DESC");
    res.json({
      success: true,
      count: cliente.length,
      data: cliente,
    });
  } catch (error) {
    res.json({
      success: false,
      mensaje: "Error al listar cliente",
      error: error.message,
    });
  }
};

module.exports = {
  listarClientes,
};
*/
