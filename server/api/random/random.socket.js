/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Random = require('./random.model');

exports.register = function(socket) {
  Random.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Random.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('random:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('random:remove', doc);
}