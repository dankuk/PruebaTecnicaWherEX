"use strict";
var dbConn = require("../../config/db.config");
//Venta object create
var Venta = function (venta) {
  this.fecha = venta.fecha;
  this.iva = venta.iva;
  this.descuento = venta.descuento;
  this.total = venta.total;
};

Venta.create = function (newEmp, result) {
  try {
    console.log(newEmp);
    dbConn.query("INSERT INTO venta set ?", newEmp, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
        return;
      }
    });
  } catch (error) {
    console.err(error);
  }
  
};
Venta.findById = function (id, result) {
  dbConn.query(
    'SELECT v.* , d.cantidad AS "cant_venta", d.subtotal, d.producto_id, d.cliente_id, p.nombre AS "producto" , p.precio AS "precio_producto", p.cantidad AS "cant_producto", c.nombre   from venta AS v, detalle AS d, cliente AS c , producto AS p WHERE v.id = d.venta_id AND d.cliente_id = c.id AND d.producto_id = p.id AND v.id = ?',
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
Venta.findAll = function (result) {
  dbConn.query(
    "Select * from venta, detalle, producto WHERE venta.id = detalle.venta_id AND detalle.producto_id = producto.id",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("venta : ", res);
        result(null, res);
      }
    }
  );
};
Venta.update = function (id, venta, result) {
  dbConn.query(
    "UPDATE venta SET fecha=?,iva=?, descuento=?, total=? WHERE id = ?",
    [venta.fecha, venta.iva, venta.descuento, venta.total, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
Venta.delete = function (id, result) {
  dbConn.query("DELETE FROM venta WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Venta;
