'use strict';

var _ = require('lodash');
var Register = require('./register.model');

// Get list of registers
exports.index = function(req, res) {
  Register.find(function (err, registers) {
    if(err) { return handleError(res, err); }
    return res.json(200, registers);
  });
};

// Get a single register
exports.show = function(req, res) {
  Register.findById(req.params.id, function (err, register) {
    if(err) { return handleError(res, err); }
    if(!register) { return res.send(404); }
    return res.json(register);
  });
};

// Creates a new register in the DB.
exports.create = function(req, res) {
  Register.create(req.body, function(err, register) {
    if(err) { return handleError(res, err); }
    return res.json(201, register);
  });
};

// Updates an existing register in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Register.findById(req.params.id, function (err, register) {
    if (err) { return handleError(res, err); }
    if(!register) { return res.send(404); }
    var updated = _.merge(register, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, register);
    });
  });
};

// Deletes a register from the DB.
exports.destroy = function(req, res) {
  Register.findById(req.params.id, function (err, register) {
    if(err) { return handleError(res, err); }
    if(!register) { return res.send(404); }
    register.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}