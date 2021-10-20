"use strict";
const Venta = require("../models/venta.model");
exports.findAll = function (req, res) {
  Venta.findAll(function (err, venta) {
    //console.log("Controlador");
    if (err) res.send(err);
    //console.log("res", venta);
    res.send(venta);
  });
};
exports.create = function (req, res) {
  const new_venta = new Venta(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Campos incompletos" });
  } else {
    Venta.create(new_venta, function (err, venta) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Venta añadido correctamente!",
        data: venta,
      });
    });
  }
};
exports.findById = function (req, res) {
  Venta.findById(req.params.id, function (err, venta) {
    if (err) res.send(err);
    res.json(venta);
  });
};
exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Campos incompletos" });
  } else {
    Venta.update(req.params.id, new Venta(req.body), function (err, venta) {
      if (err) res.send(err);
      res.json({ error: false, message: "Venta actualizado correctamente" });
    });
  }
};
exports.delete = function (req, res) {
  Venta.delete(req.params.id, function (err, venta) {
    if (err) res.send(err);
    res.json({ error: false, message: "Venta borrado correctamentee" });
  });
};
