const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// Establish path to public folder
const publicPath = path.join(__dirname, '/../public');
// Setup port based on environment var or default to 3000
const port = process.env.PORT || 3000;

// Begin app
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

// Listener for user connection
io.on('connection', (socket) => {
  console.log('New user connected');

  // Assign user to chat room
  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    // Join room
    socket.join(params.room);
    // Add user to users list
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // Greet individual user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // Inform other users that a new user has joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });


  // Listen for new message
  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  // Listen for Send Location button
  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  // Listener for user disconnection
  socket.on('disconnect', ()=> {
    var user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
    }
  });

});




server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
