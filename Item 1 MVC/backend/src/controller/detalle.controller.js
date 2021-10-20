"use strict";
const Detalle = require("../models/detalle.model");
exports.findAll = function (req, res) {
  Detalle.findAll(function (err, detalle) {
    console.log("Controlador");
    if (err) res.send(err);
    console.log("res", detalle);
    res.send(detalle);
  });
};
exports.create = function (req, res) {
  const new_detalle = new Detalle(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Campos incompletos" });
  } else {
    Detalle.create(new_detalle, function (err, detalle) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Detalle añadido correctamente!",
        data: detalle,
      });
    });
  }
};
exports.findById = function (req, res) {
  Detalle.findById(req.params.id, function (err, detalle) {
    if (err) res.send(err);
    res.json(detalle);
  });
};
exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Campos incompletos" });
  } else {
    Detalle.update(
      req.params.id,
      new Detalle(req.body),
      function (err, detalle) {
        if (err) res.send(err);
        res.json({
          error: false,
          message: "Detalle actualizado correctamente",
        });
      }
    );
  }
};
exports.delete = function (req, res) {
  Detalle.delete(req.params.id, function (err, detalle) {
    if (err) res.send(err);
    res.json({ error: false, message: "Detalle borrado correctamentee" });
  });
};
