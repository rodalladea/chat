const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);

io.on('connection', socket => {
  console.log('New client connected');
  getAllConnected();
  
  socket.on('sendMessage', data => {
    socket.broadcast.emit('receivedMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const getAllConnected = () => {
  io.clients((error, clients) => {
    if (error) throw error;
    io.sockets.emit('allUsers', clients);
  })
};

server.listen(3333, () => console.log('server running...'));