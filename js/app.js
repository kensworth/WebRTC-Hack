'use strict';

const namespace = '/test';
const socket = io(namespace);

function sendMessage(message) {
  console.log('Client sending message: ', message);
  socket.emit('message', message);
}

sendMessage('initial connection');