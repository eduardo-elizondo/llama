'use strict';

var _ = require('lodash');
var Random = require('./random.model');

// Get list of randoms
exports.index = function(req, res) {
  Random.find(function (err, randoms) {
    if(err) { return handleError(res, err); }
    return res.json(200, randoms);
  });
};

// Get a single random
exports.show = function(req, res) {
  Random.findById(req.params.id, function (err, random) {
    if(err) { return handleError(res, err); }
    if(!random) { return res.send(404); }
    return res.json(random);
  });
};

// Creates a new random in the DB.
exports.create = function(req, res) {
  Random.create(req.body, function(err, random) {
    if(err) { return handleError(res, err); }
    return res.json(201, random);
  });
};

// Updates an existing random in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Random.findById(req.params.id, function (err, random) {
    if (err) { return handleError(res, err); }
    if(!random) { return res.send(404); }
    var updated = _.merge(random, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, random);
    });
  });
};

// Deletes a random from the DB.
exports.destroy = function(req, res) {
  Random.findById(req.params.id, function (err, random) {
    if(err) { return handleError(res, err); }
    if(!random) { return res.send(404); }
    random.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}