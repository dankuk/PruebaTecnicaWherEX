"use strict";
var dbConn = require("../../config/db.config");
//Producto object create
var Producto = function (producto) {
  this.nombre = producto.nombre;
  this.precio = producto.precio;
  this.cantidad = producto.cantidad;
};

Producto.getProductos = function (result) {
  dbConn.query(
    "SELECT * FROM producto WHERE cantidad > 0",
    function (err, res) {
      if (err) {
        //console.log("error: ", err);
        result(null, err);
      } else {
        //console.log("producto : ", res);
        result(null, res);
      }
    }
  );
};

Producto.create = function (newEmp, result) {
  dbConn.query("INSERT INTO producto set ?", newEmp, function (err, res) {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
    } else {
      //console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Producto.findById = function (id, result) {
  dbConn.query("Select * from producto where id = ? ", id, function (err, res) {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Producto.verificaStockById = function (id, cant, result) {
  dbConn.query(
    `UPDATE producto SET cantidad = ? WHERE id = ?`,
    [cant, id],
    function (err, res) {
      console.log(`UPDATE producto SET cantidad = ${id} WHERE id = ${cant}`)
      if (err) {
        //console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Producto.findAll = function (result) {
  dbConn.query("Select * from producto", function (err, res) {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
    } else {
      //console.log("producto : ", res);
      result(null, res);
    }
  });
};
Producto.update = function (id, producto, result) {
  dbConn.query(
    "UPDATE producto SET nombre=?,precio=?, cantidad=? WHERE id = ?",
    [producto.nombre, producto.precio, producto.cantidad, id],
    function (err, res) {
      if (err) {
        //console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Producto.downCantProducto = function (id, producto, result) {
  //console.log("downCantProducto");
  //console.log(producto);
  //console.log(`UPDATE producto SET cantidad=${producto.cantidad} WHERE id = ${id}`);
  dbConn.query(
    "UPDATE producto SET cantidad=? WHERE id = ?",
    [producto.cantidad, id],
    function (err, res) {
      if (err) {
        //console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};


Producto.delete = function (id, result) {
  dbConn.query("DELETE FROM producto WHERE id = ?", [id], function (err, res) {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Producto;
