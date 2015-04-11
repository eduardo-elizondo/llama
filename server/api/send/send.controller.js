'use strict';

var _ = require('lodash');
var Send = require('./send.model');

// Get list of sends
exports.index = function(req, res) {
  Send.find(function (err, sends) {
    if(err) { return handleError(res, err); }
    return res.json(200, sends);
  });
};

// Get a single send
exports.show = function(req, res) {
  Send.findById(req.params.id, function (err, send) {
    if(err) { return handleError(res, err); }
    if(!send) { return res.send(404); }
    return res.json(send);
  });
};

// Creates a new send in the DB.
exports.create = function(req, res) {
  Send.create(req.body, function(err, send) {
    if(err) { return handleError(res, err); }
    return res.json(201, send);
  });
};

// Updates an existing send in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Send.findById(req.params.id, function (err, send) {
    if (err) { return handleError(res, err); }
    if(!send) { return res.send(404); }
    var updated = _.merge(send, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, send);
    });
  });
};

// Deletes a send from the DB.
exports.destroy = function(req, res) {
  Send.findById(req.params.id, function (err, send) {
    if(err) { return handleError(res, err); }
    if(!send) { return res.send(404); }
    send.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}