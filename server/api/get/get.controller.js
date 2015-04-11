'use strict';

var _ = require('lodash');
var Get = require('./get.model');

// Get list of gets
exports.index = function(req, res) {
  Get.find(function (err, gets) {
    if(err) { return handleError(res, err); }
    return res.json(200, gets);
  });
};

// Get a single get
exports.show = function(req, res) {
  Get.findById(req.params.id, function (err, get) {
    if(err) { return handleError(res, err); }
    if(!get) { return res.send(404); }
    return res.json(get);
  });
};

// Creates a new get in the DB.
exports.create = function(req, res) {
  Get.create(req.body, function(err, get) {
    if(err) { return handleError(res, err); }
    return res.json(201, get);
  });
};

// Updates an existing get in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Get.findById(req.params.id, function (err, get) {
    if (err) { return handleError(res, err); }
    if(!get) { return res.send(404); }
    var updated = _.merge(get, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, get);
    });
  });
};

// Deletes a get from the DB.
exports.destroy = function(req, res) {
  Get.findById(req.params.id, function (err, get) {
    if(err) { return handleError(res, err); }
    if(!get) { return res.send(404); }
    get.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}