const db = require("../config/database");

// ✅ CREAR ORDEN DE SERVICIO
const crearOrden = async (req, res) => {
  try {
    const {
      cliente_id,
      impresoras_id,
      tecnico_id,
      motivo_cliente,
      descripcion_falla,
    } = req.body;

    if (!cliente_id || !impresoras_id || !tecnico_id) {
      return res.status(400).json({
        success: false,
        mensaje: "Cliente, impresora y técnico son obligatorios",
      });
    }

    const [result] = await db.query(
      `INSERT INTO orden_servicio
      (cliente_id, impresoras_id, tecnico_id, estado_id, motivo_cliente, descripcion_falla)
      VALUES (?, ?, ?, 1, ?, ?)`,
      [cliente_id, impresoras_id, tecnico_id, motivo_cliente, descripcion_falla]
    );

    res.status(201).json({
      success: true,
      mensaje: "Orden de servicio creada",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ LISTAR ÓRDENES (vista principal)
const listarOrdenes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        o.id,
        o.fecha_recibido,
        o.costo_reparacion,
        e.nombre AS estado,
        c.nombres,
        c.apellidos,
        i.marca,
        i.modelo
      FROM orden_servicio o
      JOIN cliente c ON o.cliente_id = c.id
      JOIN impresora i ON o.impresoras_id = i.id
      JOIN estado_orden e ON o.estado_id = e.id
      ORDER BY o.id DESC
    `);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ DETALLE DE ORDEN
const obtenerOrdenPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT 
        o.*,
        c.nombres,
        c.apellidos,
        c.dni,
        i.marca,
        i.modelo,
        i.serie
      FROM orden_servicio o
      JOIN cliente c ON o.cliente_id = c.id
      JOIN impresora i ON o.impresoras_id = i.id
      WHERE o.id = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "Orden no encontrada",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ ACTUALIZAR SOLO ESTADO
const actualizarEstadoOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado_id } = req.body;

    await db.query("UPDATE orden_servicio SET estado_id=? WHERE id=?", [
      estado_id,
      id,
    ]);

    res.json({
      success: true,
      mensaje: "Estado actualizado",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const listarOrdenesTaller = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT o.id,
             o.motivo_cliente,
             o.estado_id,
             e.nombre AS estado,
             c.nombre AS cliente,
             i.marca,
             i.modelo
      FROM orden_servicio o
      INNER JOIN estado_orden e ON o.estado_id = e.id
      INNER JOIN cliente c ON o.cliente_id = c.id
      INNER JOIN impresora i ON o.impresoras_id = i.id
      ORDER BY o.id DESC
    `);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  crearOrden,
  listarOrdenes,
  obtenerOrdenPorId,
  actualizarEstadoOrden,
  listarOrdenesTaller,
};
