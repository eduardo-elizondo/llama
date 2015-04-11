/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Send = require('./send.model');

exports.register = function(socket) {
  Send.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Send.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('send:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('send:remove', doc);
}