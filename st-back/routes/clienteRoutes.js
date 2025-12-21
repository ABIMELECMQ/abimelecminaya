const express = require("express");
const router = express.Router();
const {
  listarClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  buscarClientesPorCoincidencia,
  buscarClientesConImpresoras,
} = require("../controllers/clienteController");

//RUTAS CRUD
//router.get("/:idcategoria", obtenerLibroPorIdCategoria); //probado
router.get("/", listarClientes);
router.post("/", crearCliente);
router.put("/:id", actualizarCliente);
router.delete("/:id", eliminarCliente);
router.get("/buscar", buscarClientesPorCoincidencia); //http://localhost:3000/api/clientes/buscar?texto=45
router.get("/buscar-con-impresoras", buscarClientesConImpresoras); //http://localhost:3000/api/clientes/buscar-con-impresoras?texto=45

module.exports = router;
