'use strict';

const socket = io.connect();
socket.on('log', function(array) {
  console.log.apply(console, array);
});
function sendMessage(message) {
  console.log('Client sending message: ', message);
  socket.emit('message', message);
}

sendMessage('initial connection');