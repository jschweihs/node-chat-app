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
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`)
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
})

// Submit message when send button is clicked
$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function () {

  });
});

var locationButton = $('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position.coords.latitude);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  })
});
