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
  
  socket.on('sendMessage', data => {
    console.log(data);
    socket.broadcast.emit('receivedMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});



const getApiEmit = socket => {
  const response = new Date();

  socket.emit('FromAPI', response);
};

server.listen(3333, () => console.log('server running...'));