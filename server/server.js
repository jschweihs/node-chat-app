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

// Listener for user connection
io.on('connection', (socket) => {
  console.log('New user connected');

  // Emit newEmail event on client
  socket.emit('newMessage', {
    from: 'jschweihs',
    text: 'Hey, how are you doing?',
    createdAt: 123
  })

  socket.on('createMessage', (message) => {
    console.log('New Message:', message);
  });
  // Listener for user disconnection
  socket.on('disconnect', ()=> {
    console.log('User has disconnected')
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
