const db = require("../config/database");

//-----------------------------listarClientes---------------------------

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

//---------------------------------------crearCliente------------------------

const crearCliente = async (req, res) => {
  try {
    const { dni, nombres, apellidos, telefono, direccion } = req.body;

    if (!dni || !nombres) {
      return res.status(400).json({
        success: false,
        mensaje: "dni y nombres son obligatorios",
      });
    }

    const [resultado] = await db.query(
      "INSERT INTO cliente (dni, nombres, apellidos, telefono, direccion) VALUES (?,?,?,?,?)",
      [dni, nombres, apellidos, telefono, direccion]
    );

    res.status(201).json({
      success: true,
      mensaje: "Cliente creado correctamente",
      id: resultado.insertId,
      dni,
      nombres,
      apellidos,
      telefono,
      direccion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: "Error al crear cliente",
      error: error.message,
    });
  }
};

//---------------------------------------actualizarCliente------------------------

const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { dni, nombres, apellidos, telefono, direccion } = req.body;
    const [clienteExistente] = await db.query(
      "SELECT * FROM cliente WHERE id=?",
      [id]
    );

    if (clienteExistente.length === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "Cliente no encontrado",
      });
    }

    await db.query(
      "UPDATE cliente SET dni=?, nombres=?, apellidos=?, telefono=?, direccion=? WHERE id=?",
      [dni, nombres, apellidos, telefono, direccion, id]
    );

    res.json({
      success: true,
      mensaje: "Cliente actualizado correctamente",
      id,
      dni,
      nombres,
      apellidos,
      telefono,
      direccion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: "Error al actualizar cliente",
      error: error.message,
    });
  }
};

//-----------------------------eliminarCliente---------------------------

const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [clienteExistente] = await db.query(
      "SELECT * FROM cliente WHERE id=?",
      [id]
    );

    if (clienteExistente.length === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "Cliente no encontrado",
      });
    }

    await db.query("DELETE FROM cliente WHERE id=?", [id]);

    res.status(200).json({
      success: true,
      mensaje: "Cliente eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: "Error al eliminar cliente",
      error: error.message,
    });
  }
};

//------------------------------buscarClientesPor-----------------------------

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
      SELECT * FROM cliente
      WHERE dni LIKE ? 
         OR nombres LIKE ?
         OR apellidos LIKE ?
      ORDER BY dni DESC
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
      mensaje: "Error al buscar cliente",
      error: error.message,
    });
  }
};

module.exports = {
  listarClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  buscarClientesPorCoincidencia,
};
