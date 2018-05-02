const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Establish path to public folder
const publicPath = path.join(__dirname, '/../public');
// Setup port based on environment var or default to 3000
const port = process.env.PORT || 3000;

// Begin app
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', ()=> {
    console.log('User has disconnected');
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
