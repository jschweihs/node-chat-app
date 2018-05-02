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

  // Greet individual user
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  // Inform other users that a new user has joined
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  // Listen for new message
  socket.on('createMessage', (message) => {
    console.log('New Message:', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  });
  // Listener for user disconnection
  socket.on('disconnect', ()=> {
    console.log('User has disconnected')
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
