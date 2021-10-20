"use strict";
const Producto = require("../models/producto.model");

exports.getProductos = function (req, res) {
  Producto.getProductos(function (err, producto) {
    console.log("Controlador");
    if (err) res.send(err);
    console.log("res", producto);
    res.send(producto);
  });
};

exports.findAll = function (req, res) {
  Producto.findAll(function (err, producto) {
    console.log("Controlador");
    if (err) res.send(err);
    console.log("res", producto);
    res.send(producto);
  });
};

exports.create = function (req, res) {
  const new_producto = new Producto(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Campos incompletos" });
  } else {
    Producto.create(new_producto, function (err, producto) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Producto añadido correctamente!",
        data: producto,
      });
    });
  }
};
exports.findById = function (req, res) {
  Producto.findById(req.params.id, function (err, producto) {
    if (err) res.send(err);
    res.json(producto);
  });
};

exports.verificaStockById = function (req, res) {
  Producto.verificaStockById(req.params.id, req.params.cant, function (err, producto) {
    if (err) res.send(err);
    res.json(producto);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Campos incompletos" });
  } else {
    Producto.update(
      req.params.id,
      new Producto(req.body),
      function (err, producto) {
        if (err) res.send(err);
        res.json({
          error: false,
          message: "Producto actualizado correctamente",
        });
      }
    );
  }
};


exports.downCantProducto = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Campos incompletos" });
  } else {
    Producto.downCantProducto(
      req.params.id,
      new Producto(req.body),
      function (err, producto) {
        if (err) res.send(err);
        res.json({
          error: false,
          message: "Producto actualizado correctamente",
        });
      }
    );
  }
};

exports.delete = function (req, res) {
  Producto.delete(req.params.id, function (err, producto) {
    if (err) res.send(err);
    res.json({ error: false, message: "Producto borrado correctamentee" });
  });
};
