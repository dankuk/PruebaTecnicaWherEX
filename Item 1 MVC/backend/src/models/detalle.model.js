"use strict";
var dbConn = require("../../config/db.config");
//Detalle object create
var Detalle = function (detalle) {
  this.venta_id = detalle.venta_id;
  this.cliente_id = detalle.cliente_id;
  this.producto_id = detalle.producto_id;
  this.cantidad = detalle.cantidad;
  this.subtotal = detalle.subtotal;
};
Detalle.create = function (newEmp, result) {
  try {
    console.log("detalle insert");
    console.log(newEmp);
    dbConn.query("INSERT INTO detalle set ?", newEmp, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        console.log("INSERT INTO detalle set ?", newEmp);
        result(null, res.insertId);
      }
    });
  } catch (error) {
    console.err(error);
  }
  
};
Detalle.findById = function (id, result) {
  dbConn.query("Select * from detalle where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Detalle.findAll = function (result) {
  dbConn.query("Select * from detalle", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("detalle : ", res);
      result(null, res);
    }
  });
};
Detalle.update = function (id, detalle, result) {
  dbConn.query(
    "UPDATE detalle SET cantidad=?,producto_id=?, subtotal=?, cliente_id=? WHERE venta_id = ?",
    [detalle.cantidad, detalle.producto_id, detalle.subtotal, detalle.cliente_id, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log(`UPDATE detalle SET cantidad= ${detalle.cantidad},producto_id=${detalle.producto_id}, subtotal=${detalle.subtotal}, cliente_id=${detalle.cliente_id} WHERE venta_id = ${id}`)
        result(null, res);
      }
    }
  );
};
Detalle.delete = function (id, result) {
  dbConn.query("DELETE FROM detalle WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Detalle;
