/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Get = require('./get.model');

exports.register = function(socket) {
  Get.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Get.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('get:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('get:remove', doc);
}