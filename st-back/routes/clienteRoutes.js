const express = require("express");
const router = express.Router();
const {
  listarClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  buscarClientesPorCoincidencia,
} = require("../controllers/clienteController");

//RUTAS CRUD
//router.get("/:idcategoria", obtenerLibroPorIdCategoria); //probado
router.get("/", listarClientes);
router.post("/", crearCliente);
router.put("/:id", actualizarCliente);
router.delete("/:id", eliminarCliente);
router.get("/buscar", buscarClientesPorCoincidencia);

module.exports = router;
