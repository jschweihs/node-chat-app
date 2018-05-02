var socket = io();

// New connection
socket.on('connect', function () {
  console.log('Connected to server');
});

// User disconnected
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// Listening for new message
socket.on('newMessage', function(message) {
  console.log('New Message:', message);
});
