"use strict";
var dbConn = require("../../config/db.config");
//Cliente object create
var Cliente = function (cliente) {
  this.nombre = cliente.nombre;
  this.estado = cliente.estado;
};

Cliente.create = function (newEmp, result) {
  console.log(newEmp);
  console.log(result);
  dbConn.query("INSERT INTO cliente set ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Cliente.findById = function (id, result) {
  dbConn.query("Select * from cliente where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Cliente.findAll = function (result) {
  dbConn.query("Select * from cliente", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("cliente : ", res);
      result(null, res);
    }
  });
};


Cliente.getClientesVenta = function (result) {
  dbConn.query("Select * from cliente WHERE estado <> 0", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("cliente : ", res);
      result(null, res);
    }
  });
};

Cliente.update = function (id, cliente, result) {
  dbConn.query(
    "UPDATE cliente SET nombre=?,estado=? WHERE id = ?",
    [cliente.nombre, cliente.estado, id],
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
Cliente.delete = function (id, result) {
  dbConn.query("DELETE FROM cliente WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Cliente;
