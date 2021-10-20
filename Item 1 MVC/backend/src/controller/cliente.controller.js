"use strict";
const Cliente = require("../models/cliente.model");
exports.findAll = function (req, res) {
  Cliente.findAll(function (err, cliente) {
    //console.log("Controlador");
    if (err) res.send(err);
    //console.log("res", cliente);
    res.send(cliente);
  });
};

exports.getClienteVenta = function (req, res) {
  Cliente.getClientesVenta(function (err, cliente) {
    //console.log("Controlador");
    if (err) res.send(err);
    //console.log("res", cliente);
    res.send(cliente);
  });
};

exports.create = function (req, res) {
  //console.log(req.body);
  const new_cliente = new Cliente(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Campos incompletos" });
  } else {
    Cliente.create(new_cliente, function (err, cliente) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Cliente añadido correctamente!",
        data: cliente,
      });
    });
  }
};
exports.findById = function (req, res) {
  Cliente.findById(req.params.id, function (err, cliente) {
    if (err) res.send(err);
    res.json(cliente);
  });
};
exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Campos incompletos" });
  } else {
    Cliente.update(
      req.params.id,
      new Cliente(req.body),
      function (err, cliente) {
        if (err) res.send(err);
        res.json({
          error: false,
          message: "Cliente actualizado correctamente",
        });
      }
    );
  }
};
exports.delete = function (req, res) {
  Cliente.delete(req.params.id, function (err, cliente) {
    if (err) res.send(err);
    res.json({ error: false, message: "Cliente borrado correctamentee" });
  });
};
