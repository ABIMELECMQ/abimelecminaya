const Tecnico = require("../models/tecnico.model");

// LISTAR
const listarTecnicos = async (req, res) => {
  try {
    const tecnicos = await Tecnico.listar();
    res.json({
      success: true,
      count: tecnicos.length,
      data: tecnicos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: "Error al listar técnicos",
      error: error.message,
    });
  }
};

// CREAR
const crearTecnico = async (req, res) => {
  try {
    const { dni, nombres, apellidos, telefono, especialidad } = req.body;

    if (!dni || !nombres || !apellidos) {
      return res.status(400).json({
        success: false,
        mensaje: "dni, nombres y apellidos son obligatorios",
      });
    }

    const id = await Tecnico.crear({
      dni,
      nombres,
      apellidos,
      telefono,
      especialidad,
    });

    res.status(201).json({
      success: true,
      mensaje: "Técnico creado correctamente",
      id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: "Error al crear técnico",
      error: error.message,
    });
  }
};

// ACTUALIZAR
const actualizarTecnico = async (req, res) => {
  try {
    const { id } = req.params;
    const filas = await Tecnico.actualizar(id, req.body);

    if (filas === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "Técnico no encontrado",
      });
    }

    res.json({
      success: true,
      mensaje: "Técnico actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: "Error al actualizar técnico",
      error: error.message,
    });
  }
};

// ELIMINAR
const eliminarTecnico = async (req, res) => {
  try {
    const { id } = req.params;
    const filas = await Tecnico.eliminar(id);

    if (filas === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "Técnico no encontrado",
      });
    }

    res.json({
      success: true,
      mensaje: "Técnico eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: "Error al eliminar técnico",
      error: error.message,
    });
  }
};

module.exports = {
  listarTecnicos,
  crearTecnico,
  actualizarTecnico,
  eliminarTecnico,
};
