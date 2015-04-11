/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Register = require('./register.model');

exports.register = function(socket) {
  Register.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Register.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('register:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('register:remove', doc);
}