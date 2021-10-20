const express = require("express");
const router = express.Router();
const clienteController = require("../controller/cliente.controller");
const productoController = require("../controller/producto.controller");
const ventaController = require("../controller/venta.controller");
const detalleController = require("../controller/detalle.controller");


//rutas Clientes
router.get("/getallcliente", clienteController.findAll);
router.get("/getclienteventa", clienteController.getClienteVenta);
router.post("/newcliente", clienteController.create);
router.get("/findclienteid/:id", clienteController.findById);
router.put("/updateclienteid/:id", clienteController.update);
router.delete("/deleteclienteid/:id", clienteController.delete);
//rutas Productos
router.get("/verificastockbyid/:id/:cant", productoController.verificaStockById);
router.get("/getProductos", productoController.getProductos);
router.get("/getallproducto", productoController.findAll);
router.post("/newproducto", productoController.create);
router.get("/findproductoid/:id", productoController.findById);
router.put("/updateproductoid/:id", productoController.update);
router.put("/downCantProducto/:id", productoController.downCantProducto);
router.delete("/deleteproductoid/:id", productoController.delete);
//rutas Ventas
router.get("/getallventa", ventaController.findAll);
router.post("/newventa", ventaController.create);
router.get("/findventaid/:id", ventaController.findById);
router.put("/updateventaid/:id", ventaController.update);
router.delete("/deleteventaid/:id", ventaController.delete);
//rutas detalle de ventas
router.get("/getalldetalle", detalleController.findAll);
router.post("/newdetalle", detalleController.create);
router.get("/finddetalleid/:id", detalleController.findById);
router.put("/updatedetalleid/:id", detalleController.update);
router.delete("/deletedetalleid/:id", detalleController.delete);

module.exports = router;
