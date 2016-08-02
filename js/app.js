'use strict';

const socket = io.connect();
const name = '/test';
const namespace = io(name);
console.log('client working');
socket.emit('find namespace', name);

namespace.on('namespace response', function() {
  console.log('namespace responded'); 
});