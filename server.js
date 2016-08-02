'use strict';

import express from 'express';
import http from 'http';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import path from 'path';
import io from 'socket.io';
import twilio from 'twilio';
import env from 'node-env-file';

env('./.env');
const APP_PORT = 3002;
const acccountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(acccountSID, authToken);
const app = express();
const server = http.createServer(app);
const ios = io.listen(server);
const compiler = webpack({
  entry: path.resolve(__dirname, 'js', 'app.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/,
      },
    ],
  },
  output: {filename: 'app.js', path: '/'},
});
const socketOpen = (err, token) => {
  ios.sockets.on('connection', function(socket) {
    socket.on('message', message => {
      console.log(message);
    })
  });
}
const testSocket = ios.of('/test');
testSocket.on('connection', function(socket) {
  console.log('connection on test socket');
});

app.use(webpackMiddleware(compiler, {
  noInfo: false,
  publicPath: '/'
}));
app.use('/', express.static(path.resolve(__dirname, 'public')));
server.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
client.tokens.create({}, (err, token) => {
  socketOpen(err, token);
});