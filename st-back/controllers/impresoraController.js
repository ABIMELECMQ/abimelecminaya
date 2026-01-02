const Impresora = require("../models/impresora.model");

// ========== LISTAR IMPRESORAS ==========
const listarImpresoras = async (req, res) => {
  try {
    const impresoras = await Impresora.listarImpresoras();
    res.json({
      success: true,
      data: impresoras,
    });
  } catch (error) {
    console.error("ERROR LISTAR IMPRESORAS:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al listar impresoras",
    });
  }
};

// ========== CREAR IMPRESORA ==========
const crearImpresora = async (req, res) => {
  try {
    const { marca, modelo, serie, cliente_id } = req.body;

    if (!cliente_id) {
      return res.status(400).json({
        success: false,
        mensaje: "cliente_id es obligatorio",
      });
    }

    const id = await Impresora.crearImpresora({
      marca,
      modelo,
      serie,
      cliente_id,
    });

    res.status(201).json({
      success: true,
      mensaje: "Impresora registrada correctamente",
      id,
    });
  } catch (error) {
    console.error("ERROR CREAR IMPRESORA:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al registrar impresora",
    });
  }
};

// ========== ACTUALIZAR IMPRESORA ==========
const actualizarImpresora = async (req, res) => {
  try {
    const { id } = req.params;
    const filas = await Impresora.actualizarImpresora(id, req.body);

    if (filas === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "Impresora no encontrada",
      });
    }

    res.json({
      success: true,
      mensaje: "Impresora actualizada correctamente",
    });
  } catch (error) {
    console.error("ERROR ACTUALIZAR IMPRESORA:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al actualizar impresora",
    });
  }
};

// ========== ELIMINAR IMPRESORA ==========
const eliminarImpresora = async (req, res) => {
  try {
    const { id } = req.params;
    const filas = await Impresora.eliminarImpresora(id);

    if (filas === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "Impresora no encontrada",
      });
    }

    res.json({
      success: true,
      mensaje: "Impresora eliminada correctamente",
    });
  } catch (error) {
    console.error("ERROR ELIMINAR IMPRESORA:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al eliminar impresora",
    });
  }
};

module.exports = {
  listarImpresoras,
  crearImpresora,
  actualizarImpresora,
  eliminarImpresora,
};
